import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'

const PRODUCT = gql`
    mutation addProduct($product: createProduct!, $files:[Upload]){
        addProduct(product: $product, files: $files){
            id
            name,
            images {
                path
            }
            category {
                id,
                name
            }
        }
    }
`

const UPLOAD_FILE = gql`
    mutation addImage($id: String!, $file: Upload!){
        addImage(id: $id, file: $file){
            url
        }
    }
`

export default function UploadForm() {
    const [ addProducts ] = useMutation(PRODUCT, {
        onCompleted: data => console.log(data)
    });

    const [ files, setFiles ] = useState([]);

    const handler = () => {
        try {
            const product = {
                name:'teste',
                price:200,
                category_id: 'e0cb45ff-8b50-4cb4-893b-5e269167b65a'
            }
            if(!files) return;
            addProducts({ variables:{ product, files } });
        } catch ($e) {
            console.log($e)
        }
    }

    const handlerFileChange = (e) => {
        try {
            console.log(e);
            files.push(e.target.files[0])
            console.log('array -<', files);
            setFiles(files);
            
        } catch ($e) {
            console.log($e)
        }
    }

    return (
        <div>
            <h1>Upload</h1>
            <input type="file" onChange={handlerFileChange} multiple/>
            <button onClick={handler} ></button>
        </div>
    );
}
