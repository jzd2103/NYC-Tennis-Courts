# Name: John Dong
# UNI: jzd2103
from flask import Flask
from flask import render_template, redirect
from flask import Response, request, jsonify
app = Flask(__name__)

data = {
    "0": {
        "id": "0",
        "name": "Milstein Family Tennis Center",
        "address": "603 W 218th St, New York, NY 10034",
        "image": """https://images.sidearmdev.com/crop?url=https%3a%2f%2fdxbhsrqyrr690
            .cloudfront.net%2fsidearm.nextgen.sites%2fgocolumbialions.com%2fimages%2f
            2025%2f2%2f7%2fCU191-001.jpg&height=540&width=1000&type=webp&gravity=smart""",
        "price": 40,
        "description": """The Milstein Family Tennis Center,
            located at the Baker Athletics Complex on 218th St, is a
            wonderful location to play at. Featuring 6 indoor and 6 outdoor
            courts, you will be able to play regardless of the weather. The
            outdoor courts feature wondrous views of the Spuyten Duyvil Creek
            and the giant Columbia \"C\". Make a reservation by calling (212) 851-7100.
            Pricing is $40 per hour, and you can reserve a court for 1, 1.5 or 2 hours.""", 
        "rating": 5.0,
        "courts": 12,
        "surfaces": ["Hard"],
        "types": ["Indoor", "Outdoor"],
        "trip": 30,
        "reviews": ["Amazing!", "Loved playing here!", "Great courts", "Will be coming back!"]
    },
    "1": {
        "id": "1",
        "name": "Central Park Tennis Center",
        "address": "1 West 96th Street &, Central Park W, New York, NY 10025",
        "image": """https://images.ctfassets.net/cgcah00ul21b/3QFeUZYtPsVjRXlBlvhXXX/
            ca64868d04abfdc3b476ab563a356845/IMG_6584-1.jpg""",
        "price": 15,
        "description": """The Central Park Tennis Center, located at the northwest corner of
            Central Park, is one of the city's premier tennis facilities. Featuring 30 courts,
            including both hard and clay surfaces, it caters to players of all levels. Set
            against the backdrop of the park's lush greenery, it offers a peaceful yet vibrant
            environment for outdoor play. The center's accessibility and top-notch facilities
            make it a favorite destination for both locals and visitors alike.""", 
        "rating": 4.4,
        "courts": 30,
        "surfaces": ["Clay", "Hard"],
        "types": ["Outdoor"],
        "trip": 25,
        "reviews": ["Love how many courts there are!", "Great location", "Central Park is beautiful!"]
    },
    "2": {
        "id": "2",
        "name": "96th Street Clay Tennis Courts",
        "address": "Hudson River Greenway, New York, NY 10025",
        "image": """https://riversideparknyc.org/wp-content/uploads/2025/01/96th-Clay-Courts-
            scaled-e1740424963609-2048x1110.jpg""",
        "price": 15,
        "description": """The 96th Street Clay Tennis Courts are a must go. Surrounded by flower gardens and
            lush lawns right on the water,
            these are the only outdoor red-clay public courts in the city and one of the
            very few in the nation. The Riverside Tennis Assocation, a Conservancy affiliate,
            manages this location and offers a wide array of tennis programming for all ages:
            adult and junior group programs, competitions, summer camp, private lessons and
            other events including picnics, parties and free concerts every Saturday night
            in the summer. Learn more about the clay courts and get involved at Riversidetennis.org.""", 
        "rating": 4.4,
        "courts": 10,
        "surfaces": ["Clay"],
        "types": ["Outdoor"],
        "trip": 24,
        "reviews": ["Great clay courts!", "Beautiful location", "Love the red clay!"]
    },
    "3": {
        "id": "3",
        "name": "Riverside Park Tennis Courts",
        "address": "W 119th St, New York, NY 10025",
        "image": """https://patch.com/img/cdn20/users/26049333/20220801/101936/
            styles/patch_image/public/9yspoaeqne5mfogunrsva___01101357871.jpg""",
        "price": 15,
        "description": """Riverside Park Tennis Courts, located along the Hudson River in Manhattan,
            offer a picturesque setting for tennis enthusiasts. The courts are nestled within
            Riverside Park, providing beautiful views of the river and the skyline. With
            multiple well-maintained courts, it's a popular spot for both casual players and
            those looking to play competitively. The park's accessibility and scenic surroundings
            make it a relaxing yet vibrant destination for outdoor sports.""", 
        "rating": 4.0,
        "courts": 10,
        "surfaces": ["Hard"],
        "types": ["Outdoor"],
        "trip": 10,
        "reviews": ["Rude workers", "Loved the courts", "Got kicked off our courts.."]
    },
    "4": {
        "id": "4",
        "name": "Inwood Hill Park Tennis Courts",
        "address": "Seaman Ave &, Isham St, New York, NY 10034",
        "image": """https://images.ctfassets.net/cgcah00ul21b/4MThaXA0xXGl1Qtn6J6eTa/
            0269123e5d295a267f89ac1d7f6cfcd6/unnamed.jpg""",
        "price": 15,
        "description": """Inwood Hill Park Tennis Courts, located in the northern tip of Manhattan,
            offer a serene and scenic setting for tennis enthusiasts. Surrounded by the park's
            natural beauty, including its lush woods and the Harlem River, the courts provide a
            peaceful escape from the city's hustle. The well-maintained hard courts are perfect
            for both casual players and more competitive matches. The park's relaxed atmosphere
            and its blend of nature and sport make it a hidden gem for tennis lovers.""", 
        "rating": 4.2,
        "courts": 9,
        "surfaces": ["Hard"],
        "types": ["Outdoor"],
        "trip": 31,
        "reviews": ["Fantastic!", "Hidden gem!", "Great courts"]
    },
    "5": {
        "id": "5",
        "name": "Riverbank State Park Tennis Courts", 
        "address": "679 Riverside Dr, New York, NY 10031",
        "image": """https://tennispronow.com/courts/wp-content/uploads/2024/04/kspp69pxykwz1jhn3aui.png""", 
        "price": 10, 
        "description": """Riverbank State Park Tennis Courts, located along the Hudson River in Harlem,
            offer a fantastic setting for tennis enthusiasts. The park features several well-maintained
            outdoor hard courts, making it a popular spot for both casual players and those seeking a
            more competitive match. With stunning views of the river and the George Washington Bridge,
            the courts provide a unique backdrop for a game of tennis. The park's spacious surroundings
            and community atmosphere make it a favorite destination for locals and visitors alike.""",
        "rating": 4.6, 
        "courts": 4, 
        "surfaces": ["Hard"],
        "types": ["Outdoor"], 
        "trip": 15, 
        "reviews": ["Great location!", "Always a fun time", "Busy but worth it", "Highly recommend!"] 
    }, 
    "6": { 
        "id": "6", 
        "name": "Fort Greene Park Tennis Courts", 
        "address": "136-144, DeKalb Ave, Brooklyn, NY 11217", 
        "image": """https://images.squarespace-cdn.com/content/v1/56bcd2eae707eb87a6e361e6/
            1653474582697-KUI83CB9ZT9JVACWABYV/courts+from+the+hill_edit.jpg?format=1500w""", 
        "price": 15, 
        "description": """Located in the heart of Fort Greene, Brooklyn, these tennis
            courts provide a calm and welcoming environment for players. The courts are
            surrounded by lush greenery and historic architecture, offering a serene
            escape from the city bustle. With multiple well-maintained courts, it's a
            favorite spot for casual players and local enthusiasts. The community atmosphere
            and easy access make it a great choice for tennis lovers.""", 
        "rating": 4.7, 
        "courts": 6, 
        "surfaces": ["Hard"], 
        "types": ["Outdoor"], 
        "trip": 50, 
        "reviews": ["Lovely park!", "A hidden gem", "Nice and peaceful", "Great for a quick match!"] 
    }, 
    "7": { 
        "id": "7", 
        "name": "Prospect Park Tennis Center", 
        "address": "50 Parkside Ave, Brooklyn, NY 11226", 
        "image": "https://images.ctfassets.net/cgcah00ul21b/6oxwRmG0yHwrph5UyubIeu/84042dba6104e3e0af27591cf4640293/o.jpg", 
        "price": 25, 
        "description": """Prospect Park Tennis Center, located in Brooklyn's famous Prospect Park,
            features several well-maintained courts surrounded by nature. This park offers both clay
            and hard courts, making it a versatile destination for tennis players.
            The peaceful atmosphere and beautiful park setting provide a refreshing environment
            to play and relax. It's a beloved spot for both beginners and seasoned players
            looking for a bit of Brooklyn charm.""", 
        "rating": 4.3, 
        "courts": 11, 
        "surfaces": ["Clay", "Hard"], 
        "types": ["Indoor", "Outdoor"], 
        "trip": 65, 
        "reviews": ["Beautiful setting", "Fantastic courts", "Perfect for a day out", "Highly recommend the clay courts!"] 
    }, 
    "8": { 
        "id": "8", 
        "name": "Astoria Park Tennis Courts", 
        "address": "80 21st St, Astoria, NY 11105", 
        "image": """https://www.breakthelove.com/_next/image?url=https%3A%2F%2Fbreakthelove-production-assets-1.
            s3.us-east-2.amazonaws.com%2F72e78bb7-028b-4afe-8345-142d2c274e6c%2FSfq5ob_9RpSuBIFRMZNPKg.jpeg&w=3840&q=75""", 
        "price": 15, 
        "description": """Astoria Park Tennis Courts, located in the heart of Astoria, Queens, offer a spacious
            and well-maintained environment for tennis players. The park features multiple outdoor hard
            courts with beautiful views of the East River and the iconic Triborough Bridge. Its central
            location makes it a popular spot for locals, with courts available for both casual play and
            more competitive matches. The combination of great facilities and scenic surroundings
            makes Astoria Park a top choice for tennis enthusiasts in the area.""", 
        "rating": 4.2, 
        "courts": 14, 
        "surfaces": ["Hard"], 
        "types": ["Outdoor"], 
        "trip": 43, 
        "reviews": ["Great views!", "Love playing here", "Relaxing spot", "Highly recommend!"] 
    }, 
    "9": { 
        "id": "9",
        "name": "Hudson River Park Tennis Courts", 
        "address": "92 Hudson River Greenway, New York, NY 10014", 
        "image": """https://images.ctfassets.net/cgcah00ul21b/1J59lW16jkA6CMowEzPSOd/
            1b692bfcfdccd0e0daccfb35becc9c96/Hudson-River-Park-Tennis-Courts.jpg""", 
        "price": 0, 
        "description": """The Hudson River Park Tennis Courts are located along the vibrant waterfront of
            Manhattan, offering stunning views of the Hudson River and the New Jersey skyline. These
            well-maintained outdoor courts are a popular spot for both casual and serious players, with
            several courts available for booking. The park's beautiful setting, with its walking paths
            and green spaces, adds a refreshing element to any tennis game. With its prime location
            and picturesque views, the Hudson River Park Tennis Courts provide a unique and enjoyable
            experience for all.""", 
        "rating": 4.5, 
        "courts": 3, 
        "surfaces": ["Hard"], 
        "types": ["Outdoor"], 
        "trip": 38, 
        "reviews": ["Beautiful location!", "Great courts", "Loved the views", "A must-visit!"] }
}

# remove formatting in description and image url
for court in data.values():
    court['description'] = court['description'].replace("            ", "").replace("\n", " ")
    court['image'] = court['image'].replace("            ", "").replace("\n", "")

next_id = 10

# ROUTES

@app.route('/')
def home():
    global data
    return render_template('home.html', data=data)   

@app.route('/search', methods=['GET', 'POST'])
def search():
    global data
    results = []
    search_input = request.args.get('search-input')
    for court in data.values():
        if search_input.lower() in court["name"].lower():
            results.append(court["id"])

        for surface in court["surfaces"]:
            if search_input.lower() in surface.lower() and court["id"] not in results:
                results.append(court["id"])

        for type in court["types"]:
            if search_input.lower() in type.lower() and court["id"] not in results:
                results.append(court["id"])
    return render_template('search.html', search_input=search_input, results=results, data=data)

@app.route('/view_all', methods=['GET', 'POST'])
def view_all():
    global data
    results = list(data.keys())
    return render_template('view_all.html', results=results, data=data)

@app.route('/view/<court_id>')
def view(court_id):
    global data
    for id in data:
        if id == str(court_id):
            return render_template('view.html', court=data[id])
        
    return "ERROR: Court not found", 404

@app.route('/add', methods=['GET', 'POST'])
def add():
    global data
    if request.method == 'GET':
        return render_template('add.html', data=data)
    else:
        global next_id

        json_data = request.get_json()

        new_data = {data: json_data[data] for data in ['name', 'address', 'image', 'price', 'description',
            'courts', 'types', 'trip', 'surfaces', 'rating']}

        if len(json_data['reviews']) != 0:
            new_data['reviews'] = [review for review in json_data['reviews'].split('\n')]
        else:
            new_data['reviews'] = "0"

        new_id = next_id
        new_data["id"] = str(new_id)

        new_data["rating"] = float(new_data["rating"])
        new_data["price"] = float(new_data["price"])
        new_data["courts"] = int(new_data["courts"])
        new_data["trip"] = int(new_data["trip"])

        next_id += 1

        data[str(new_id)] = new_data

        return jsonify(new_data=new_data)
    
@app.route('/edit/<court_id>', methods=['GET', 'POST'])
def edit(court_id):
    global data

    if request.method == 'GET':
        reviews_str = ""
        court_reviews = data[court_id]['reviews']
        for i in range(len(court_reviews)):
            if i == len(court_reviews)-1:
                reviews_str += court_reviews[i]
            else:
                reviews_str += court_reviews[i] + '\n'

        return render_template('edit.html', data=data, court=data[court_id], reviews_str=reviews_str)
    else:
        json_data = request.get_json()

        new_data = {data: json_data[data] for data in ['id', 'name', 'address', 'image', 'price', 'description',
            'courts', 'types', 'trip', 'surfaces', 'rating']}
        
        new_data['reviews'] = [review for review in json_data['reviews'].split('\n')]
        
        new_data["rating"] = float(new_data["rating"])
        new_data["price"] = float(new_data["price"])
        new_data["courts"] = int(new_data["courts"])
        new_data["trip"] = int(new_data["trip"])
        
        data[court_id] = new_data

        return jsonify(new_data=new_data)


if __name__ == '__main__':
   app.run(debug = True, port=5001)
