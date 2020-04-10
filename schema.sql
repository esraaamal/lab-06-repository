  
DROP TABLE IF EXISTS location_city;
-- IF NOT EXISTS
CREATE TABLE  location_city (
id SERIAL PRIMARY KEY ,
search_query VARCHAR(255),
formatted_query VARCHAR(255),
latitude NUMERIC,
longitude NUMERIC
);

