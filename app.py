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
Sharkattacks.Time, Sharkattacks.Species, Sharkattacks.Investigator_or_Source, Sharkattacks.pdf]
#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    session = Session(engine)

    sel = column_names

    results = session.query(*sel).\
    filter(Sharkattacks.Country == "USA").all()
    records_all = []
    for Case_Number, Date, Year, Type, Country, Area, Location, Activity, Name, Sex, Age, Injury, Fatal, Time, Species, Investigator_or_Source, pdf in results:
        records_dict = {}
        records_dict["Case_Number"] = Case_Number
        records_dict["Date"] = Date
        records_dict["Year"] = Year
        records_dict["Type"] = Type
        records_dict["Country"] = Country
        records_dict["Area"] = Area
        records_dict["Location"] = Location
        records_dict["Activity"] = Activity
        records_dict["Name"] = Name
        records_dict["Sex"] = Sex
        records_dict["Age"] = Age
        records_dict["Injury"] = Injury
        records_dict["Fatal"] = Fatal
        records_dict["Time"] = Time
        records_dict["Species"] = Species
        records_dict["Investigator_or_Source"] = Investigator_or_Source
        records_dict["pdf"] = pdf
        records_all.append(records_dict)

    return jsonify(records_all)
    #return render_template('settings.html', data=records_all)
    session.close()  


if __name__ == '__main__':
    app.run(debug=True)