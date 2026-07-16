const { Airplane } = require('../models/index');

class AirplaneRepository {

    async createAirplane(data) {
        try {
            const airplane = await Airplane.create(data);
            return airplane;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAirplane(airplaneId) {
        try {
            const airplane = await Airplane.findByPk(airplaneId);
            return airplane;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllAirplanes() {
        try {
            const airplanes = await Airplane.findAll();
            return airplanes;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async destroyAirplane(airplaneId) {
        try {
            await Airplane.destroy({
                where: { id: airplaneId }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async updateAirplane(airplaneId, data) {
        try {
            const airplane = await Airplane.findByPk(airplaneId);
            await airplane.update(data);
            return airplane;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = AirplaneRepository;