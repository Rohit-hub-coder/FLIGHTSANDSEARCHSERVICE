const { Op } = require('sequelize');
const { Flight, Airplane, Airport, City } = require('../models/index');

class FlightRepository {

    async createFlight(data) {
        try {
            const flight = await Flight.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flight.findByPk(flightId, {
                include: [
                    { association: 'airplane' },
                    { association: 'departureAirport' },
                    { association: 'arrivalAirport' }
                ]
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllFlights() {
        try {
            const flights = await Flight.findAll({
                include: [
                    { association: 'airplane' },
                    { association: 'departureAirport' },
                    { association: 'arrivalAirport' }
                ]
            });
            return flights;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async destroyFlight(flightId) {
        try {
            await Flight.destroy({
                where: { id: flightId }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateFlight(flightId, data) {
        try {
            const flight = await Flight.findByPk(flightId);
            await flight.update(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlights(filter) {
        try {
            const startDate = new Date(filter.departureDate);
            const endDate = new Date(filter.departureDate);
            endDate.setDate(endDate.getDate() + 1);

            const response = await Flight.findAll({
                where: {
                    departureAirportId: filter.departureAirportId,
                    arrivalAirportId: filter.arrivalAirportId,
                    departureTime: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                },
                include: [
                    { association: 'airplane' },
                    { association: 'departureAirport' },
                    { association: 'arrivalAirport' }
                ],
                order: [['price', 'ASC']]
            });
            return response;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = FlightRepository;