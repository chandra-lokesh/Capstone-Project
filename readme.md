
---

Stock Bridge

Stock Bridge is a stock market simulation platform where users can practice buying and selling stocks using virtual money.
It provides real-time stock data, top gainers/losers, market news, and the ability to track favorite stocks in a watchlist.

Features:

* User Authentication – Register and log in securely
* Buy and Sell Stocks – Simulate trades without real money
* Top Gainers & Losers – View the best and worst performing stocks
* Latest News – Stay updated with stock market articles
* Search Stocks – Find any stock by name or symbol
* Watchlist – Save and track your favorite stocks
* Portfolio Dashboard – Monitor your holdings and performance

Tech Stack:

* Backend: Java Spring Boot (Microservices Architecture)
* Frontend: Angular
* Database: PostgreSQL
* Others: Spring Cloud (Eureka Server, API Gateway)

How to Run Locally:

1. Clone the Repository:
   * git clone https://github.com/chandra-lokesh/Capstone-Project.git

2. Backend Setup:

   * Open the backend project in IntelliJ IDEA.
   * Load Maven dependencies.
   * Change database configurations in application.properties or application.yaml
   * Run microservices in the following order:

     1. Eureka Server
     2. User Auth Service
     3. Portfolio Service
     4. API Gateway

3. Frontend Setup:

   * Open the project folder in VS Code.
   * Run `npm install` in the terminal.
   * Navigate to `stock-angular/stock-angular`.
   * Run `ng serve` to start the frontend.
   * Open `http://localhost:4200` in your browser.
   * Go to `/register` to create an account, then log in.

Screenshots:

* Signup – 
![Signup](screenshots/1.%20register.png)

* Login – 
![Login](screenshots/2.%20login.png)

* Home – 
![Home](screenshots/3.%20home.png)

* Explore – 
![Explore](screenshots/4.%20explore.png)

* Search – 
![Search](screenshots/5.%20search.png)

* Stock Details – 
![Stock](screenshots/6.%20stock.png)

* Buy – 
![Buy](screenshots/7.%20buy.png)

* Dashboard – 
![Dashboard](screenshots/8.%20dashboard.png)

* Sell – 
![Sell](screenshots/9.%20sell.png)

* Learn – 
![Learn](screenshots/10.%20learn.png)

* Account – 
![Account](screenshots/11.%20account.png)


Future Improvements:

* Mobile-friendly responsive UI
* Advanced analytics and charts
* Price alerts and notifications

License:
This project is licensed under the MIT License – you are free to use and modify it.

Contributing:
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you find this project useful, consider giving it a star on GitHub.

---

