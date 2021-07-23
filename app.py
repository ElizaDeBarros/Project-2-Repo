import numpy as np
import datetime as dt
from dateutil.relativedelta import relativedelta

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/Resources/shark-attacks.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Sharkattacks = Base.classes.sharkattacks




#################################################
# Flask Setup
#################################################
app = Flask(__name__)

column_names = [Sharkattacks.Case_Number, Sharkattacks.Date, Sharkattacks.Year, Sharkattacks.Type,
Sharkattacks.Country, Sharkattacks.Area, Sharkattacks.Location, Sharkattacks.Activity, 
Sharkattacks.Name, Sharkattacks.Sex, Sharkattacks.Age, Sharkattacks.Injury, Sharkattacks.Fatal, 
Sharkattacks.Time, Sharkattacks.Species, Sharkattacks.Investigator_or_Source, Sharkattacks.pdf, Sharkattacks.href]
#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    session = Session(engine)

    #sel = [column_names[0], column_names[4], column_names[7], column_names[11]]
    sel = column_names

    results = session.query(*sel).\
    group_by(Sharkattacks.Country).filter(Sharkattacks.Country == "SOUTH AFRICA").all()
    return jsonify(results)
    session.close()  


if __name__ == '__main__':
    app.run(debug=True)