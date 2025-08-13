from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class SearchReq(BaseModel):
    origin: str = Field(..., min_length=3, max_length=3, description="Where is the orgin of travel")
    destination: str=Field(..., min_length=3, max_length=3, description="Where is the travel destination")
    type_trip: str=Field(..., min_length=6, max_length=11, description="Is it a round-trip, one-way, or multi-way?")
    departure_date: str=Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$", description="Person's expected departure dates")
    coming_back_date: str=Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$", description="When person is coming back")
    num_passengers: int=Field(..., gt=0, le=10, description="Number of passengers needed to account for")

class Flight(BaseModel):
    number: str
    depart_time: str
    arrival_time: str
    flight_type: str
    cabin_type: str
    prices: Dict[str, int]
    duration: str

class SearchRes(BaseModel):
    flights: List[Flight]


def scrape_delta(req: SearchReq) -> List[Flight]:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=50)
        page = browser.new_page()
        page.goto('https://www.delta.com/')
        try:
            page.get_by_role('button', name='I understand').click(timeout=3000)
            print("Clicked I understad cookie")
        except:
            pass
        if page.is_visible('div.ancillary-headband'):
            page.click('li#tab_flights')
        
        #Flight origin/destination info:
        page.click('a#fromAirportName')
        page.click('div.input-group.active')
        page.wait_for_selector('input#search_input', timeout=5000)
        page.click('input#search_input')
        page.type('input#search_input', req.origin, delay=100)
        page.click('div.airport-lookup-container.search-dialog')
        page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')
        page.click("a#toAirportName")
        page.click('div.input-group.active')
        page.wait_for_selector('input#search_input', timeout=5000)
        page.click('input#search_input')
        page.type('input#search_input', req.destination, delay=100)
        page.click('div.airport-lookup-container.search-dialog')
        page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')

        #Flight select fields:
        page.click('div.col-sm-12.select_dropdown.trip-type-container.trip-element.d-lg-block.offset-md-2.col-md-8.offset-lg-0.book-element.mb-3.mb-lg-0.select-container.select-container-down-md.ng-tns-c84-2.d-sm-none.col-lg-2.booking-element')
        print("clicked div")
        page.click(f"li:has-text({req.type_trip})")
        page.click('div.calDispValueCont.icon-Calendar  ')

        date_dict = {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12
        }
        month_dict = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }

        def depart_month(user_date, current_month_one, current_month_two):
            print("The userdate", user_date)
            print("The current month one", current_month_one)
            print("The current month two", current_month_two)
            date_list = user_date.split(" ")
            month = date_list[0]
            number = date_dict[month]
            month_one = date_dict[current_month_one]
            month_two = date_dict[current_month_two]
            if number > month_one and number > month_two:
                page.click('a.dl-datepicker-1')
                next_month = page.inner_text('span.dl-datepicker-month-0')
                next_next_month = page.inner_text('span.dl-datepicker-month-1')
                depart_month(user_date, next_month, next_next_month)  
            else:
                return month_one, month_two
            
        def depart_day(user_date):
            date_list = user_date.split(" ")
            month_num = date_dict[date_list[0]]
            return month_num, date_list[1], date_list[2]

        def click_day(last_month, last_day, last_year):
            date_obj = datetime.date(int(last_year), int(last_month), int(last_day))
            day_number = date_obj.weekday()
            day_name = date_obj.strftime("%A")
            page.locator(f"a.dl-state-default[aria-label='{last_day} {month_dict[last_month]} {last_year}, {day_name}']").click()


        month_one = page.inner_text("span.dl-datepicker-month-0")
        month_two = page.inner_text("span.dl-datepicker-month-1")
        depart_month("November 23 2025", month_one, month_two)
        last_month, last_day, last_year = depart_day(req.origin)
        click_day(last_month, last_day, last_year)
        month_one = page.inner_text("span.dl-datepicker-month-0")
        month_two = page.inner_text("span.dl-datepicker-month-1")
        print(month_one, month_two)
        depart_month(req.coming_back_date, month_one, month_two)
        last_month, last_day, last_year = depart_day(req.coming_back_date)
        click_day(last_month, last_day, last_year)
        page.click("button.donebutton")
        page.click('div.col-sm-12.col-lg-3.d-lg-block.offset-md-2.col-md-8.book-element.booking-element.select-container.select-container-down-md.passenger-booking-element.ng-tns-c84-2.d-sm-none.offset-lg-0')
        page.click('span#passengers-val')
        page.locator(f"li#ui-list-passengers{req.num_passengers-1}").click()
        page.click("button#btn-book-submit")




        #Search Results Page

        #Flight Specific Information:
        page.wait_for_selector(f"#flight-results-grid-0")
        options = page.locator('div.search-results__grid.container-lg-up.container.container-lg-down')
        options = options.locator("div.flight-results-grid.mach-flight-results-grid.ng-star-inserted")
        options = options.all_inner_texts()
        print(len(options))
        def price_info(index):
            flight_grid_0 = page.locator(f"div#flight-results-grid-{index}")
            prices = flight_grid_0.locator('span.mach-revenue-price__whole.ng-star-inserted')
            all_prices = prices.all_inner_texts()
            ordered_prices = []
            for i in all_prices:
                if i not in ordered_prices:
                    ordered_prices.append(i)
            return ordered_prices
        
        flight_dict = {

        }
        
        for i in range(len(options)):
            prices = price_info(i)
            flight_dict[i] = prices
        print(flight_dict)



        page.pause()

@app.get("/registeredinfo")

@app.post('/scrape-delta', response_model=SearchReq)

#I have to make a  bit of the frontend so that I can send data back and forth