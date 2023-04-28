const express = require('express')
const app = express()
const port = 3000
const { bubbleSort, quickSort } = require('./sorting')

app.use(express.json())

let stressCount = 0

app.post('/', function (req, res) {
    console.log(`I'm being stressed :( ${++stressCount}`)
    let status = 400
    let result = {
        "msg": "No array was sent.\n",
        "sorted_array": []
    }
    let unsortedArray = req.body['array']

    if (unsortedArray) {
        unsortedArray = unsortedArray.map((v) => parseInt(v))
        result['msg'] = "Here is your sorted array.\n"
        result['sorted_array'] = quickSort(unsortedArray)
        status = 200
    }

    res.status(status).send(result)
})

app.listen(port, () => {
    console.log(`I'm working on http://localhost:${port}:)`)
})
