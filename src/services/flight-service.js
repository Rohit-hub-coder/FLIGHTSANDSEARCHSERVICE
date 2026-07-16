const { FlightRepository } = require('../repository/index');

class FlightService {
    constructor() {
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            const flight = await this.flightRepository.createFlight(data);
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
}

module.exports = FlightService;