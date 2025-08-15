from playwright.sync_api import sync_playwright
import datetime
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from fastapi.middleware.cors import CORSMiddleware
import sys, json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
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



flight_dict = {

}

time_dict = {

}



def searchFlights():
    content = json.load(sys.stdin)
    # print(content)  # Remove this debug print
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=50)
        page = browser.new_page()
        page.goto('https://www.delta.com/')
        try:
            page.get_by_role('button', name='I understand').click(timeout=3000)
        except:
            pass
        if page.is_visible('div.ancillary-headband'):
            page.click('li#tab_flights')
        
        #Flight origin/destination info:
        page.click('a#fromAirportName')
        page.click('div.input-group.active')
        page.wait_for_selector('input#search_input', timeout=5000)
        page.click('input#search_input')
        page.type('input#search_input', content['origin'], delay=100)
        page.click('div.airport-lookup-container.search-dialog')
        page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')
        page.click("a#toAirportName")
        page.click('div.input-group.active')
        page.wait_for_selector('input#search_input', timeout=5000)
        page.click('input#search_input')
        page.type('input#search_input', content['destination'], delay=100)
        page.click('div.airport-lookup-container.search-dialog')
        page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')

        #Flight select fields:
        page.click('div.col-sm-12.select_dropdown.trip-type-container.trip-element.d-lg-block.offset-md-2.col-md-8.offset-lg-0.book-element.mb-3.mb-lg-0.select-container.select-container-down-md.ng-tns-c84-2.d-sm-none.col-lg-2.booking-element')
        page.click(f"li:has-text('{content['trip_type']}')")
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
            month = user_date[0]
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
            

        def click_day(last_month, last_day, last_year):
            date_obj = datetime.date(int(last_year), date_dict[last_month], int(last_day))
            day_name = date_obj.strftime("%A")
            page.locator(f"a.dl-state-default[aria-label='{last_day} {last_month} {last_year}, {day_name}']").click()

        def clickPassengers():
            passenger_index = int(content['num_passengers']) - 1
            page.click(f"li#ui-list-passengers{passenger_index}")


        month_one = page.inner_text("span.dl-datepicker-month-0")
        month_two = page.inner_text("span.dl-datepicker-month-1")
        depart_month(content['departure_date'], month_one, month_two)
        # page.pause()
        last_month, last_day, last_year = content['departure_date']
        click_day(last_month, last_day, last_year)
        month_one = page.inner_text("span.dl-datepicker-month-0")
        month_two = page.inner_text("span.dl-datepicker-month-1")
        depart_month(content['coming_back_date'], month_one, month_two)
        last_month, last_day, last_year = content['coming_back_date']
        click_day(last_month, last_day, last_year)
        # page.pause()
        page.click("button.donebutton")
        page.wait_for_selector('span#passengers-val')
        page.click('span#passengers-val')
        # page.pause()
        page.click(f"li#ui-list-passengers{str(int(content['num_passengers'])-1)}")
        page.wait_for_selector('li#ui-list-passengers0', state='visible')  # Wait for dropdown to open
        clickPassengers()
        # page.pause()
        page.click("button#btn-book-submit")




        #Search Results Page

        #Flight Specific Information:
        page.wait_for_selector(f"#flight-results-grid-0")
        options = page.locator('div.search-results__grid.container-lg-up.container.container-lg-down')
        options = options.locator("div.flight-results-grid.mach-flight-results-grid.ng-star-inserted")
        options = options.all_inner_texts()
        # print(len(options))  # Remove this debug print
        def price_info(index):
            flight_grid = page.locator(f"div#flight-results-grid-{index}")
            time_container = flight_grid.locator('.flight-schedule__operation-time')  # Added dot for class
            both_times = time_container.all_inner_texts()
            time_dict[index] = both_times
            prices = flight_grid.locator('span.mach-revenue-price__whole.ng-star-inserted')
            all_prices = prices.all_inner_texts()
            ordered_prices = []
            for i in all_prices:
                if i not in ordered_prices:
                    ordered_prices.append(i)
            return ordered_prices
        
        for i in range(len(options)):
            prices = price_info(i)
            flight_dict[i] = prices

        
        
        # Only print the final JSON result
        print({
            'flight-info': json.dumps(flight_dict),
            'time-info': json.dumps(time_dict)
        })  # This sends clean JSON back to Node.js
        page.pause()
        return flight_dict
    









#I have to make a  bit of the frontend so that I can send data back and forth



if __name__ == "__main__":
    searchFlights()