export default function Footer(){
    return(
        <div style={{marginTop:'auto'}} className="container">
            <div className="row navbar navbar-fixed-bottom">
                <div className="col-12 col-md-4">
                    Da un'idea di <a href="https://twitter.com/cirospat" target="_blank" rel="noreferrer">@cirospat</a><br/>
                    Elaborazione dati: <a href="https://github.com/gabacode" target="_blank" rel="noreferrer">@gabacode</a>
                </div>
                <div className="col-12 col-md-4">
                    
                </div>
                <div style={{textAlign:'right',alignSelf:'center'}} className="col-12 col-md-4">
                    Fonte dati: <a href="https://dati.regione.sicilia.it/dataset/covid-19-vaccini-sicilia-target-e-vaccinati-per-comune-e-fasce-di-eta" target="_blank" rel="noreferrer">Regione Sicilia</a>
                </div>
            </div>
        </div>
    )
}