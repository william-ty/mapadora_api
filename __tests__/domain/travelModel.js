const {Travel} = require("../../src/models/index")

test("Should be an travel type model", () => {
    
    const travel = Travel.build();
    expect( travel instanceof Travel).toBe(true);

})