# Front-end Test Task

Rationale for certain choices:

* most libs were chosen to help me quickly prototype this app (emotion, reach-router, redux-thunk)
* parcel is an excellent bundler that allows you to immediately start developing a poc without wasting time on configuration.
  Most of the defaults are sane, it supports typescript out of the box. Like I said, webpack is totally fine, but parcel allows you
  to do things way quicker without using boilerplate/template projects.
* emotion is a great CSS-in-JS alternative to Sass/CSS modules. It's quick, works well and has no limitations.
* reach-router is just a small tool that I have been interested in using in some small projects and it solves problem of simple routing well.

There may be some inconsistencies in the code, but its only because I am doing this on the weekend :P
I just hope that it shows that I know how to use react and redux well enough!

Enjoy!

## How to run

    git clone https://github.com/are1000/auto1-zadanie.git
    npm install
    npm run start
  
Then open your browser on `localhost:8080`.

## Task

Develop SPA which should manage merchants. A user can interact with:
 - list of merchants (better with pagination)
 - adding merchant (redux-form is allowed but not required)
 - merchant editing
 - merchant removing
 - sorted history of bids for each merchant

Front-end part should be developed as SPA with ES6, React and Redux.
You can also use TypeScript to develop this task, but it is not required
Back-end API should be mocked.

## Data structure example
Bid {
  id: string,
  carTitle: string,
  amount: number,
  created: string
}

Merchant {
  id: string,
  firstname: string,
  lastname: string,
  avatarUrl: string,
  email: string,
  phone: string,
  hasPremium: boolean,
  bids: Array<Bid>
}