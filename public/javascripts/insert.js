const onChangeFile = () => {
  const token=document.getElementById('token');
    const key=document.getElementById('key');
    const title=document.getElementById('title');
    const content=document.getElementById('content');
    const file = document.getElementById('image-file').files[0];
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('image-view').src = e.target.result;
      document.getElementById('image-view').style.display = 'block';
    }
    reader.readAsDataURL(file);
   
}
