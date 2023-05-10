const edit = (id) => {
    window.location.href = `http://localhost:3001/${id}/product_update`
}
const editStore = (id) => {
    window.location.href = `http://localhost:3001/${id}/store_update`
}
const onChangeFile = () => {
    const file = document.getElementById('image-file').files[0];
    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('image-view').src = e.target.result;
        document.getElementById('image-view').style.display = 'block';
    }
    reader.readAsDataURL(file);
}