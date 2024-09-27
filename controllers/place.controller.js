const Place = require("../models/Place")

// Adds a place in the DB
exports.addPlace = async (req, res) => {
    try {
        const userData = req.user
        const { 
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        } = req.body

        const place = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        })
        res.status(200).json({
            place,
        })
    }
    catch(err) {
        res.status(200).json({
            message: "Internal server error",
            error: err,
        })
    }
}

// Return user specifics place
exports.userPlaces = async (req, res) => {
    try {
        const userData = req.user
        const id = userData.id
        res.status(200).json(await Place.find({ owner: id }))
    }
    catch(err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Updates a place