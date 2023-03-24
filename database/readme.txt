
- set enviroment variables cho mongo 6.0 và mongo tool
- cd C:\Program Files\MongoDB\Server\tool\bin

*****export data*****
mongodump -d "database_name" -o "folder"
*ex: mongodump -d my_podcast -o D:\Project\My-Podcast\database


*****import data*****
mongorestore -d "(new)database_name" "folder"
*ex: mongorestore -d my_podcast D:\Project\My-Podcast\database\my_podcast