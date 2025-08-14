import { spawn } from "child_process"
import { dirname } from "path"
import path from "path"
import { fileURLToPath } from "url"

export async function registeredInfoController(req, res){
    console.log("Inside controller")
    console.log(req.body)
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const serverdir = path.join(__dirname, '..', 'airline-info', 'scrape.py')
    console.log("serverdir", serverdir)
    try{
        console.log("Inside try block")
        const py = spawn('/Users/manavkamdar/miniconda3/bin/python', [
            serverdir
        ], { stdio: ['pipe', 'pipe', 'pipe']})


        // console.log("Here is the req body", req.body)

        try{
            py.stdin.write(JSON.stringify({origin: req.body.origin, destination: req.body.destination, trip_type: req.body.trip_type, departure_date: req.body.departure_date, coming_back_date: req.body.coming_back_date, num_passengers: req.body.num_passengers}))
        }catch(err){
            console.log("Error with the stdin write", err)
        }
        try{
            py.stdin.end()
        }catch(err){
            console.log("Error with the stdin")
        }

        let out = ''
        let err = ''

        py.stdout.on('data', chunk => { out += chunk })
        py.stderr.on('data', chunk => { err += chunk})

        console.log("Here is the out", out)
        console.log("Here is the err", err)

        py.on('close', code =>{
            if (code != 0){
                return res.status(500).json({ error: 'Python Failed', code, stderr: err})
            }
            try{
                const data = JSON.parse(out)
                console.log("Parsed Data", data)
                return res.json(data)
            }catch{
                return res.json({ result: out.trim() })
            }
        })
    }catch (e){
        console.log("Error")
        res.json(e)
    }
}