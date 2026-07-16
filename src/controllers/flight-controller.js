const { FlightService } = require('../services/index');
const flightService = new FlightService();

const create = async (req, res) => {
    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(201).json({
            success: true,
            message: "Successfully created a flight",
            data: flight,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating flight",
            data: {},
            err: error
        });
    }
};

const get = async (req, res) => {
    try {
        const flightId = req.params.id;
        const flight = await flightService.getFlight(flightId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched a flight",
            data: flight,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching flight",
            data: {},
            err: error
        });
    }
};

const getAll = async (req, res) => {
    try {
        const flights = await flightService.getAllFlights();
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all flights",
            data: flights,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching flights",
            data: {},
            err: error
        });
    }
};

const destroy = async (req, res) => {
    try {
        const flightId = req.params.id;
        await flightService.deleteFlight(flightId);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the flight",
            data: {},
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting flight",
            data: {},
            err: error
        });
    }
};

const update = async (req, res) => {
    try {
        const flightId = req.params.id;
        const flight = await flightService.updateFlight(flightId, req.body);
        return res.status(200).json({
            success: true,
            message: "Successfully updated the flight",
            data: flight,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating flight",
            data: {},
            err: error
        });
    }
};

module.exports = { create, get, getAll, destroy, update };