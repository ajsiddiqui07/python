from fastapi import FastAPI
from pydantic import BaseModel


class City(BaseModel):
    name: str
    state: str
    venue_count: int


app = FastAPI(title="Lotus Lantern Venues API")

cities = [
    City(name="Mumbai", state="Maharashtra", venue_count=24),
    City(name="Delhi", state="Delhi", venue_count=18),
    City(name="Bengaluru", state="Karnataka", venue_count=15),
    City(name="Jaipur", state="Rajasthan", venue_count=9),
    City(name="Kochi", state="Kerala", venue_count=7),
    City(name="Hyderabad", state="Telangana", venue_count=12),
]


@app.get("/cities", response_model=list[City])
def list_cities():
    return cities
