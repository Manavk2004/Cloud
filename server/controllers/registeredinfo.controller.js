

export async function registeredInfoController(req, res){
    const body = await req.body
    console.log(body)
    res.json("Done")
}