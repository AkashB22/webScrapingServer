To run your app:
1. Initially load all the dependencies by run - npm install 
2. Then start express app - npm start

To interact with the api's:
1. To scrap data from hindu and save on our local mongoDB use below api
    http://localhost:3000/articles/save/month
  eg: http://localhost:3000/articles/save/01

  You can save all articles month-wise to your db.

Note:
1. The Hindu server seems to reject request by sending(status- 429) due to the limitation of request send within a period of them. You will get partial datas.
