const OpenHours = ({ timeSetting }) => {
    if (!timeSetting || !timeSetting.length) return null
    return <>
        {timeSetting && timeSetting.length && <div className="d-flex flex-column w-100 open-hours-box">
            <h4 className="mt-4 p-2 pb-4 light" style={{ borderBottom: "solid 1px #ddd" }}>
                <i className="fa fa-clock-o mr-2"></i>Openinig Hours</h4>

            {timeSetting.map((element, index) => <div key={index}><div className="d-flex flex-row col-12 mb-2">
                <div className="col-6 bold d-flex justify-content-start align-items-center">{element.day.toUpperCase()}</div>
                <div className="col-6 d-flex flex-column justify-cotent-start align-items-start">
                    {element.times.map((ele) => <span>{ele.from} - {ele.to}</span>)}
                </div>
            </div>
                {index + 1 < timeSetting.length && <hr />}
            </div>)}
        </div>
        }
    </>
}

export default OpenHours