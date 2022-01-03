export const fileUpload= async (file) =>{

    const cloudUrl='https://api.cloudinary.com/v1_1/drxefkg80/upload';

    const formData= new FormData();

    formData.append('upload_preset', 'react-journal-app');
    formData.append('file', file);

    try {

        //Para la parte del body en  postman
        //se envia así 
        const res= await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(res.ok){
            const cloudResp= await res.json();
            return cloudResp.secure_url;
        }
        else{
            throw await res.json();
        }
        
    } catch (error) {
        throw error;
    }

    //return url de la imagen
}