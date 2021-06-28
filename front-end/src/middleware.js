let local;
if (typeof(Storage) !== "undefined") {
    // Store
    local = localStorage.getItem("ls-u") || ''


}
const authUser = {
    localStorage: local

}

export default authUser