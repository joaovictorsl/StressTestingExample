const express = require('express')
const app = express()
const port = 3000
const { bubbleSort, quickSort } = require('./sorting')

app.use(express.json())

let stressCount = 1

app.post('/', function (req, res) {
    // Prepares error response in case of empty array
    let status = 400
    let result = {
        "msg": "No array was sent.\n",
        "sorted_array": []
    }
    let unsortedArray = req.body['array']

    // Sorts array
    if (unsortedArray) {
        console.log(`Starting sort ${stressCount}`)
        unsortedArray = unsortedArray.map((v) => parseInt(v))
        result['msg'] = "Here is your sorted array.\n"
        result['sorted_array'] = quickSort(unsortedArray)
        console.log(`Sorting ${stressCount++} finished`)

        status = 200
    }

    // Sends response
    res.status(status).send(result)
})

app.listen(port, () => {
    console.log(`I'm working on http://localhost:${port}:)`)
})
