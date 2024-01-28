import { useState,useRef } from 'react';
import { extractColors } from 'extract-colors'
import './App.css'

type ColourObject = {
    hex:string,
    area:number,
}

function App() {

  let fileInputRef = useRef(null);
  const [file,setFile] = useState('');
  const [fileURL,setfileURL] = useState('');
  const [colorsList,setColorsList] = useState<Array<ColourObject>>([]);

  const handleFile = (event:any) => {
    console.log('file',event);
    let file = event?.target.files[0];
    if(file) 
    {
      const fileObjectURL = URL.createObjectURL(file);
      setfileURL(fileObjectURL);

      extractColors(fileObjectURL)
      .then((data:Array<ColourObject>)=>setColorsList(data))
      .catch((error)=>console.error("error ", error))
      setFile(file);
    }
  }

  const extractColor = async () =>{

  }

  return (
    <>
      <div className="project-name">Colour Extractor</div>
      <div style={{display:'flex',padding:20,minHeight:500}}  >
        <div style={{padding:50,width:"50%",display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid grey',margin:20,borderRadius:10}} onClick={()=>{fileInputRef?.current?.click()}}>
          <input  ref={fileInputRef} type="file" id="image" name="image" style={{display:'none'}} accept=".jpg, .jpeg, .png"  onChange={handleFile} />
          <div style={{position:'absolute',height:400,padding:20}}>
              {fileURL && <img src={fileURL} alt="uploaed-image" style={{maxWidth:'100%',maxHeight:'100%'}} /> }
              <div style={{textAlign:'center',marginTop:40}}>
                Upload or Replace Image
              </div>
            </div> 
      </div>
      <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',border:'1px solid grey',marginTop:20,borderRadius:10,overflow:'auto',height:440,paddingTop:20}}>
        {
          colorsList.map((color)=>{
            return (
              <>
                <div style={{height:60,width:60,borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:color?.hex, color:'black',padding:10}}>{color?.hex}</div>
                <br/>
              </>
            )
          })
        }

        </div>
      </div>
      {/* <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
        <button onClick={extractColor} disabled={!file}>Extract Colours</button>
      </div> */}
    </>
  )
}

export default App
