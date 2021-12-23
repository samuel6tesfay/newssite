const ImagePreview = (props) => {
    return (
        <div class="containerfileslector">
                <div class={props.imageSrc ?"wrapperfileslector active":"wrapperfileslector"}>
                    <div class="imagefileslector">
                    {props.imageSrc ? <img src={props.imageSrc} alt="" />:props.avatar&&<img src={props.avatar} />}

                    </div>
                    <div class="contentfileslector">
                        <div class="iconfileslector">
                            <i class="fa fa-upload"></i>
                        </div>
                        <div class="textfileslector">
                        </div>
                    </div>
                    <div id="cancel-btn" onClick={()=>props.setImageSrc("")}>
                        <i class="fa fa-times"></i>
                    </div>
                    <div class="file-namefileslector active">
                        {props.image ? props.image.name : "File name here"}

                    </div>
                </div>
                        
                <button
                    onClick={() => document.getElementById('default-btn').click()}
                    type="button"
                    id="custom-btn">
                    Choose a file
                </button>

                <input
                    onChange={props.fileSelectedHandler}
                    id="default-btn"
                    type="file"
                    style={{ position: "relative", top: "-40px" }}
                    hidden
                />

        </div>
     );
}
 
export default ImagePreview;