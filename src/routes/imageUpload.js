const router = require("express").Router()
const Image = require("../model/imageUpload");
const upload = require("../middleware/upload");


router.post("/image/:userId", upload.array('file'), async (req, res) => {

    const image = req.files
    imgArray = []
    image.forEach(img => {
        imgArray.push(img.filename)
    });
    console.log(image);

     let count = 0;
     const normalFunction = () => {
         imgArray.forEach(async (e) => {
             const imageData = Image({
                 userId: req.params.userId,
                 set: req.body.set,
                 name: `${req.body.name} ${count}`,
                 title: req.body.title,
                 image: e,
                 discription: req.body.discription
             })
             count++
             await imageData.save();
        })
     }
     normalFunction()
     res.status(200).json("image upload sucess")

 })

router.get('/image/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const userdata = await Image.find({ $and: [{ userId: id }, { set: req.body.set }] });
        console.log(userdata);
        res.status(200).json(userdata)

    } catch (error) {
        res.send(error)

    }
})

router.delete('/image/:id/:set', async (req, res) => {
    try {
        const id = req.params.id
        const set = req.params.set
        const setName = req.body.name
        const userImage = await Image.deleteOne({ $and: [{ userId: id }, { set }, { name: setName }] });
        res.status(200).json("user image has been deleted")

    } catch (error) {
        res.status(403).json(error)

    }
})

router.put('/image/:userId/:set', upload.single('file'), async (req, res) => {
    try {

        const imageData = req.file.filename
        const name = req.body.name
        const userId = req.params.userId
        const set = req.params.set


        await Image.updateOne({ $and: [{ userId }, { set }, { name }] },
            {
                $set: {
                    image: imageData
                }
            })

        res.status(200).json(" user image has been updated ")

    } catch (error) {
        res.status(404).json(error)

    }
})

module.exports = router;