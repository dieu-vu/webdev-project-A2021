// Show which file is chosen
const updateList = function () {
    const input = document.querySelector('#file');
    const output = document.querySelector('#fileList');
    let children = "";
    for (let i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ul>' + children + '</ul>';
}