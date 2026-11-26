from datetime import datetime, timezone
from decimal import Decimal
from typing import Literal

from fastapi import FastAPI, status
from pydantic import BaseModel, Field


VenueType = Literal["HALL", "LAWN", "TERRACE"]


class VenueCreate(BaseModel):
    name: str
    city: str
    venue_type: VenueType
    capacity: int = Field(ge=10)
    price_per_day: Decimal = Field(gt=0)
    is_outdoor: bool


class Venue(VenueCreate):
    id: int
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class PriceHintRequest(BaseModel):
    capacity: int = Field(ge=10)
    is_outdoor: bool


app = FastAPI(title="Venue Booker API")

venues = [
    Venue(
        id=1,
        name="Harbourlight Grand Hall",
        city="Mumbai",
        venue_type="HALL",
        capacity=350,
        price_per_day=Decimal("85000.00"),
        is_outdoor=False,
    ),
    Venue(
        id=2,
        name="Pink City Garden Lawn",
        city="Jaipur",
        venue_type="LAWN",
        capacity=500,
        price_per_day=Decimal("65000.00"),
        is_outdoor=True,
    ),
    Venue(
        id=3,
        name="Mysuru Terrace Pavilion",
        city="Bengaluru",
        venue_type="TERRACE",
        capacity=120,
        price_per_day=Decimal("42000.00"),
        is_outdoor=True,
    ),
    Venue(
        id=4,
        name="Marina Celebration Hall",
        city="Chennai",
        venue_type="HALL",
        capacity=250,
        price_per_day=Decimal("70000.00"),
        is_outdoor=False,
    ),
    Venue(
        id=5,
        name="Lakeview Green Lawn",
        city="Udaipur",
        venue_type="LAWN",
        capacity=400,
        price_per_day=Decimal("90000.00"),
        is_outdoor=True,
    ),
    Venue(
        id=6,
        name="Nizam Courtyard Terrace",
        city="Hyderabad",
        venue_type="TERRACE",
        capacity=180,
        price_per_day=Decimal("55000.00"),
        is_outdoor=True,
    ),
]


@app.get("/venues", response_model=list[Venue])
def list_venues():
    return venues


@app.post(
    "/venues",
    response_model=Venue,
    status_code=status.HTTP_201_CREATED,
)
def create_venue(venue_data: VenueCreate):
    venue = Venue(
        id=max((existing.id for existing in venues), default=0) + 1,
        **venue_data.model_dump(),
    )
    venues.append(venue)
    return venue


@app.post("/price-hint")
def create_price_hint(price_data: PriceHintRequest):
    suggestion = price_data.capacity * 150
    if price_data.is_outdoor:
        suggestion += 5000
    return {"suggestion": suggestion}
