export function ready(cb) {
    document.onreadystatechange = function() {
       
        if(document.readyState === "interactive") {
            cb();
        }
    }
}

