"use client"

const PopupUpdate = () => {
    return ( 
        <div>
            <div>
                <span>Popup Edit</span>
            </div>
            <form>
                <input type="text" id="temp" name="temp" className="outline-none w-full md:w-auto border-none rounded text-sm" placeholder="Nhập vào giá trị nhiệt độ..." />
                <label htmlFor="temp">
                </label>
            </form>
        </div>
     );
}
 
export default PopupUpdate;