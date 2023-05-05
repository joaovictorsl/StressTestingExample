const express = require('express')
const app = express()
const port = 3000
const { bubbleSort, quickSort } = require('./sorting')

app.use(express.json())

let stressCount = 1

app.post('/bubblesort', function (req, res) {
    sortRequestHandler(req, res, bubbleSort)
})

app.post('/quicksort', function (req, res) {
    sortRequestHandler(req, res, quickSort)
})

function sortRequestHandler(req, res, algorithm) {
    let status = 400
    let result = {
        "msg": "No array was sent.\n",
        "sorted_array": []
    }
    let unsortedArray = req.body['array']

    // Sorts array and sets response and status
    if (unsortedArray) {
        console.log(`Starting sort ${stressCount}`)
        unsortedArray = unsortedArray.map((v) => parseInt(v))
        result['msg'] = "Here is your sorted array.\n"
        result['sorted_array'] = algorithm(unsortedArray)
        console.log(`Sorting ${stressCount++} finished`)

        status = 200
    }

    // Sends response
    res.status(status).send(result)
}

app.listen(port, () => {
    console.log(`I'm working on http://localhost:${port}:)`)
})
