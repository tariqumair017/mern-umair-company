import { useAuth } from "../store/auth"; 


export const Services = () => {
    const { services } = useAuth();
    console.log("services page here", services);

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services </h1>
            </div>

            <div className="container grid grid-three-cols">
                {services.map((element, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src="/images/design.png" alt="design-img" />
                            </div>
                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{element.provider}</p>
                                    <p>{element.price}</p>
                                </div>
                                <h2>{element.service}</h2>
                                <p>{element.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}