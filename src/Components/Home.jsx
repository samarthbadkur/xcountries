import React, { useEffect, useState } from "react";
import axios from "axios";  

const API_URL = "https://xcountries-backend.labs.crio.do/all";

function Home() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Logs error to console on API failure (already handled in useEffect's catch block)
    useEffect(() => {
        try {
            const res = axios.get(API_URL);
            setCountries(res.data);
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.error(error);
        }

    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>Error fetching data: {error}</div>;

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
            padding: "20px"
        }}>  
            {countries.map((country) => (
                <div key={country.name + Math.random()} style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                    <img
                        src={country.flag}
                        alt={country.name}
                        style={{ width: "100px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div style={{ marginTop: "8px", fontWeight: "bold" }}>
                        {country.name}
                    </div>
                </div>
                // <div>{country.name}</div>
            ))}
        </div>
    );
}

export default Home;