from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


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
        print("Tabs shown")
        page.click('li#tab_flights')
        print("Clicked tabs")
    else:
        print("Tabs not shown")
    page.click('a#fromAirportName')
    print("Clicked from airport selector")
    page.click('div.input-group.active')
    page.wait_for_selector('input#search_input', timeout=5000)
    print("Clicked div")
    page.click('input#search_input')
    print("Clicked input")
    page.type('input#search_input', 'ATL', delay=100)
    print("Fill done")
    page.click('div.airport-lookup-container.search-dialog')
    page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')
    page.click("a#toAirportName")
    page.click('div.input-group.active')
    page.wait_for_selector('input#search_input', timeout=5000)
    page.click('input#search_input')
    print("Clicked input")
    page.type('input#search_input', 'MIA', delay=100)
    print("Fill done")
    page.keyboard.press('Enter')
