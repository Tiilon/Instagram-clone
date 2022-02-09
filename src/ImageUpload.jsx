import React, {useState} from 'react'
import { Button } from '@material-ui/core';

function ImageUpload() {
    const [caption,setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState('')

    const handleChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () =>{
        console.log('hi')
    }

    return (
        <div>
            <div className="">
                <input type="text" onChange={(e)=>setCaption(e.target.value)} placeholder="Enter a caption..."/>
                <input type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload
