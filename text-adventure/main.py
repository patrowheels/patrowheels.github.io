location = ""
score = 0
inventory = {}
gasTaken = 0
keysTaken = 0
doorOpened = 0

def handleInput():
    global location
    global doorOpened
    print("")
    print("Location: " + location)
    i = input("---> ")
    
    if i == "north":
        if location == "Jail Cell":
            print("You walk through the open door and enter a long, dim hallway.")
            print("The hallway stretches to the east and west.")
            location = "Hallway (Middle)"
        elif location == "Hallway (West)":
            if doorOpened == 1:
                print("You enter a room with a chair in the corner and a desk surrounded by bulletproof glass.")
                print("There is an open door to the north.")
                location = "Jail Entrance"
            else:
                print("You find a door, but it is locked. Would you like to open it?")
                l5 = input("---> ")
                if l5 == "yes":
                    if "keys" in inventory:
                        print("You open the door with the ring of keys and walk through.")
                        location = "Jail Entrance"
                        doorOpened = 1
                        print("There is a chair in the corner and a desk surrounded by bulletproof glass.")
                        print("There is an open door to the north.")
                        location = "Jail Entrance"
                    else:
                        print("You do not have a key.")
                else:
                    print("You do not attempt to open the door.")
        elif location == "Jail Entrance":
            print("You leave the jail and walk onto a sandy beach.")
            print("The water is dark and terbulant. You hear waves crashing on the shore.")
            location = "Outside the Jail"
        elif location == "Outside the Jail":
            print("You walk straight into the ocean. You can't swim! You drown!")
            return False
        elif location == "Beach (West)":
            print("You board the old, red, motor boat, which is slightly on the sand.")
            print("Would you like to push off from the shore?")
            i3 = input("---> ")
            if i3 == "yes":
                print("You push off from the shore.")
                location = "Ocean"
                return boat()
            else:
                print("The boat remains at the shore.")
        else:
            print("You can't go that way.")
    elif i == "south":
        if location == "Hallway (Middle)":
            print("You return to the empty jail cell.")
            location = "Jail Cell"
        elif location == "Jail Entrance":
            print("You enter the west end of a long hallway.")
            location ="Hallway (West)"
        elif location == "Outside the Jail":
            print("You return to the jail entrance.")
            print("There is a chair in the corner and a desk surrounded by bulletproof glass.")
            location = "Jail Entrance"
        else:
            print("You can't go that way.")
    elif i == "east":
        if location == "Hallway (Middle)":
            print("You reach the east end of the hallway.")
            print("There is a ring of keys here. Would you like to pick it up?")
            i2 = input("---> ")
            if i2 == "yes":
                inventory["keys"] = 5
                keysTaken = 1
                print("You pick up the ring of keys. They jingle pleasantly.")
            else:
                print("You do not pick up the keys.")
            location = "Hallway (East)"
        elif location == "Hallway (West)":
            print("You walk back toward the jail cell.")
            location = "Hallway (Middle)"
        elif location == "Beach (West)":
            print("You walk east until you find yourself standing in front of the jail once more.")
            location = "Outside the Jail"
        else:
            print("You can't go that way.")
    elif i == "west":
        if location == "Hallway (Middle)":
            print("You reach the west end of the hallway.")
            global gasTaken
            if gasTaken == 0:
                print("There is a gas can here. Would you like to pick it up?")
                i2 = input("---> ")
                if i2 == "yes":
                    inventory["gas"] = 1
                    gasTaken = 1
                    print("You pick up the gas can. It is heavy.")
                else:
                    print("You do not pick up the gas can.")
            location = "Hallway (West)"
        elif location == "Hallway (East)":
            print("You walk back toward the jail cell.")
            location = "Hallway (Middle)"
        elif location == "Outside the Jail":
            print("You walk along the beach until you see an old, red, motor boat.")
            location = "Beach (West)"
        else:
            print("You can't go that way.")
    elif i == "inventory":
        if len(inventory) == 0:
            print("You are not holding anything.")
        else:
            for item in inventory:
                print(item + " : " + str(inventory[item]))
    elif i == "end":
        print("Goodbye!")
        return False
    else:
        print("I don't understand, please try again.")
    return True
    
def boat():
    global score
    print("You float on the open ocean, tossing and turning dangerously.")
    i4 = input("The motor appears to be out of fuel. Add fuel? ---> ")
    if i4 == "yes":
        if "gas" in inventory:
            print("You poor gas from the gas can you collected earlier into the motor.")
            print("The motor sparks to life!")
            print("You take off into the night.")
            score = 1000
            return False
        else:
            print("You don't have any fuel.")
            print("A strong wave flips the boat. You can't swim! You drown!")
            return False
    else:
        print("A strong wave flips the boat. You can't swim! You drown!")
        return False
    return True
    
def main():
    global location
    location = "Jail Cell"
    global score
    score = 0
    inventory = {"spoon": 1}
    gasTaken = 0
    print("----------------------------------")
    print("Welcome to ESCAPE FROM ALCATRAZ!!!")
    print("----------------------------------")
    print("You awake to find yourself in an empty jail cell.")
    print("The cell door is to the north. It is ajar.")
    result = handleInput()
    while result:
        result = handleInput()
    print("Score: " + str(score))
    answer = input("Would you like to play again? ---> ")
    if answer == "yes":
        main()
    else:
        print("Goodbye!")
        
main()