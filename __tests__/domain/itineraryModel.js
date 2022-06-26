const {Itinerary} = require("../../src/models/index")

test("Should be an itinerary model", () => {
    
    const itinerary = Itinerary.build();
    expect( itinerary instanceof Itinerary).toBe(true);

})