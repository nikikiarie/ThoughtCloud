const url= `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_API_NAME}/auto/upload`

const uploadMedia = async (media) => {
    const formData = new FormData()
    formData.append('file', media)
    formData.append('upload_preset', 'chat-app-media')

    const res = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const data = await res.json()

    return data
}

export default uploadMedia