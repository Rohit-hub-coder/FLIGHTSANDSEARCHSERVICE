const { FlightRepository, AirplaneRepository, AirportRepository } = require('../repository/index');
const { compareTime, isValidDate, isFutureDate } = require('../utils/helper');

class FlightService {

    constructor() {
        this.flightRepository = new FlightRepository();
        this.airplaneRepository = new AirplaneRepository();
        this.airportRepository = new AirportRepository();
    }

    async createFlight(data) {
        try {
            // Reject bad date formats early — no point hitting the DB with garbage input
            if (!isValidDate(data.departureTime) || !isValidDate(data.arrivalTime)) {
                throw { error: 'Invalid date format provided' };
            }

            // Don't allow flights to be scheduled in the past
            if (!isFutureDate(data.departureTime)) {
                throw { error: 'Departure time cannot be in the past' };
            }

            // Arrival has to come after departure, obviously
            if (!compareTime(data.arrivalTime, data.departureTime)) {
                throw { error: 'Arrival time cannot be less than departure time' };
            }

            // Make sure the airplane referenced actually exists before we go further
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            if (!airplane) {
                throw { error: "Airplane with this ID does not exist" };
            }

            // Same check for both airports — departure and arrival
            const departureAirport = await this.airportRepository.getAirport(data.departureAirportId);
            if (!departureAirport) {
                throw { error: "Departure airport with this ID does not exist" };
            }

            const arrivalAirport = await this.airportRepository.getAirport(data.arrivalAirportId);
            if (!arrivalAirport) {
                throw { error: "Arrival airport with this ID does not exist" };
            }

            // totalSeats shouldn't come from the client — it's tied to the airplane's actual capacity
            const flight = await this.flightRepository.createFlight({
                ...data,
                totalSeats: airplane.capacity
            });

            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getAllFlights() {
        try {
            const flights = await this.flightRepository.getAllFlights();
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async deleteFlight(flightId) {
        try {
            const response = await this.flightRepository.destroyFlight(flightId);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async updateFlight(flightId, data) {
        try {
            const flight = await this.flightRepository.updateFlight(flightId, data);
            return flight;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }

    async getFlights(filter) {
        try {
            const flights = await this.flightRepository.getFlights(filter);
            return flights;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
}

module.exports = FlightService;