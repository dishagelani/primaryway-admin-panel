import React, {useState, useEffect} from "react";
import Dropzone from "react-dropzone";

const Index = ({handleImage}) => {
    const [image, setImage] = useState({});
    const uploadImage = (files) => {
        Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener("load", (ev) => {
                        resolve({url: ev.target.result, name: file.name});
                        setImage({
                            avatarUrl: reader.result,
                            imageFile: file,
                        });
                    });
                    reader.addEventListener("error", reject);
                    reader.readAsDataURL(file);
                });
            })
        );
    };

    useEffect(() => {
        handleImage(image);
    }, [image]);

    return (
        <div>
            <Dropzone onDrop={uploadImage} multiple={false}>
                {({getRootProps, getInputProps}) => {
                    return (
                        <section
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="heading-class-button">
                                    {image.avatarUrl
                                        ? "Change Photo"
                                        : "Upload Photo"}
                                </div>
                            </div>
                        </section>
                    );
                }}
            </Dropzone>
        </div>
    );
};

export default Index;
