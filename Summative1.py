#DEFINING IMPORTANT VARIABLES

from graphics import*
prices = [14.99, 9.99, 9.99, 11.99, 10.99, 12.99, 14.99, 4.99, 3.99, 2.99]
food=["Fondue","Raclette","Capuns","Cheese pasta","Rösti","Pizzoccheri","Berner Platte","Borscht","Hot Choc","Fiji Water"]
foodFormat=["Fondue-----$14.99","Raclette-----$9.99","Capuns------$9.99","Cheese pasta--$11.99","Rösti-------$10.99","Pizzoccheri-----$12.99","Berner Platte--$14.99","Borscht-------$4.99","Hot Choc------$3.99","Fiji Water-------$2.99"]
hitboxesLeft=[Point(85,387),Point(83,488),Point(80,590),Point(80,688),Point(80,780),Point(463,387),Point(466,486),Point(460,588),Point(460,685),Point(460,785)]
hitboxesRight=[Point(312,407),Point(304,508),Point(320,610),Point(324,706),Point(316,808),Point(735,408),Point(730,510),Point(725,605),Point(723,710),Point(740,810)]
orderedItems=[0,0,0,0,0,0,0,0,0,0]
orderedPrices=[]
quantity=[]
locations=[Point(200,400),Point(200,500),Point(200,600),Point(200,700),Point(200,800),Point(600,400),Point(600,500),Point(600,600),Point(600,700),Point(600,800)]


#CODE STARTS HERE

totalPrice=0
TwiggyburgerMenu=GraphWin("Twiggyburger Menu",800,1000)  #Window creation
TwiggyburgerMenu.setBackground ("black")
logo=(Image (Point(380,150),"a__pictures/cheeses.png"))
logo.draw(TwiggyburgerMenu)
menuTitle=Text(Point(400,300),"MENU")
menuTitle.setTextColor ("#feb269")
menuTitle.setSize (50)
menuTitle.setFace ('lilita one')
menuTitle.draw (TwiggyburgerMenu)
checkoutButton=Rectangle(Point(700,100),Point(800,150))
checkoutButton.setFill("orange")
removeButton=Rectangle(Point(0,100),Point(100,150))
removeButton.setFill ("red")
for e in range (len(food)):    
    item=Text(locations[e],foodFormat[e])    #loops the amount of the number of foods and draws them
    item.setTextColor ("#feb269")
    item.setSize (20)
    item.setFace ("lilita one")
    item.draw(TwiggyburgerMenu)
restaurantTitle=Text(Point (400,900),"La fishe au fromage")
restaurantTitle.setSize(60)
restaurantTitle.setTextColor("#feb269")
restaurantTitle.setFace("birthstone")
restaurantTitle.draw(TwiggyburgerMenu)

for q in range (10):
    quantity.append(Text(Point (hitboxesLeft[q].getX()-50,hitboxesLeft[q].getY()), orderedItems[q]))
    quantity[q].setTextColor("orange")   #allows you to click on the words to order
    quantity[q].setSize(15)
    quantity[q].setFace("lilita one")
    quantity[q].draw(TwiggyburgerMenu)
checkoutClicked=False
firstItemSelected = False
while checkoutClicked==False:   #while the user doesn't click the orange checkout
    clicked=TwiggyburgerMenu.getMouse()
    itemSelected=-1
    for i in range (len(hitboxesLeft)):
        if clicked.getX()>=hitboxesLeft[i].getX() and clicked.getX()<=hitboxesRight[i].getX() and clicked.getY()>=hitboxesLeft[i].getY() and clicked.getY()<=hitboxesRight[i].getY():
            itemSelected=i
            orderedItems[i]+=1
            quantity[i].setText(orderedItems[i])
            if firstItemSelected == False:
                try:
                    checkoutButton.draw(TwiggyburgerMenu)
                    removeButton.draw(TwiggyburgerMenu)
                except GraphicsError:
                    pass
                firstItemSelected = True
            break
    for i in range(len(hitboxesLeft)):
        if orderedItems[i] > 0:  # Only if item was ordered
            # Define remove zone (e.g., right side of screen, same Y as item i)
            remove_left_x = 0    # Adjust to your layout
            remove_right_x = 100
            remove_top_y = 100
            remove_bottom_y = 150
            
            if (clicked.getX()>=remove_left_x and clicked.getX()<=remove_right_x and 
                clicked.getY()>=remove_top_y and clicked.getY()<=remove_bottom_y):
                orderedItems[i] -= 1
                quantity[i].setText(orderedItems[i])
                
                # Hide checkout if no items left
                if sum(orderedItems) == 0:
                    checkoutButton.undraw()
                    firstItemSelected = False
                break
        if clicked.getX()>700 and clicked.getX()<800 and clicked.getY()>100 and clicked.getY()<150:
            checkoutClicked=True
            totalPrice = 0  
            for j in range(len(orderedItems)):
                for k in range(orderedItems[j]):  
                    totalPrice += prices[j]       

tipMenu = GraphWin("Tip", 800, 200)
tipMenu.setBackground("black")
tip10=Rectangle(Point(0,0),Point(200,130))
tip10.setFill("orange")
tip10.draw(tipMenu)
tip10Txt=Text(Point(100,60),"Tip 10%")
tip10Txt.setFace('lilita one')
tip10Txt.draw(tipMenu)

tip15=Rectangle(Point(200,0),Point(400,130))
tip15.setFill("orange")
tip15.draw(tipMenu)
tip15Txt=Text(Point(300,60),"Tip 15%")
tip15Txt.setFace('lilita one')
tip15Txt.draw(tipMenu)

tip20=Rectangle(Point(400,0),Point(600,130))
tip20.setFill("orange")
tip20.draw(tipMenu)
tip20Txt=Text(Point(500,60),"Tip 20%")
tip20Txt.setFace('lilita one')
tip20Txt.draw(tipMenu)

tipless=Rectangle(Point(600,0),Point(800,130))
tipless.setFill("orange")
tipless.draw(tipMenu)
tiplessTxt=Text(Point(700,60),"No tip :(")
tiplessTxt.setFace('lilita one')
tiplessTxt.draw(tipMenu)
tipHitboxes = [Point(0,0), Point(200,130),# tip10
           Point(200,0), Point(400,130),  # tip15  
           Point(400,0), Point(600,130),  # tip20
           Point(600,0), Point(800,130)]  # tipless

tipNotClicked = True


#rectangles/texts

tip_percent = 0  # Global variable to store selected tip
while tipNotClicked:
    clicked = tipMenu.getMouse()
    tipSelected = -1
    
    for z in range(0, len(tipHitboxes), 2):  # Step by 2 (left/right pairs)
        left_pt = tipHitboxes[z]
        right_pt = tipHitboxes[z+1]
        
        if (clicked.getX() >= left_pt.getX() and clicked.getX() <= right_pt.getX() and
            clicked.getY() >= left_pt.getY() and clicked.getY() <= right_pt.getY()):
            tipSelected = z // 2  # 0=10%, 1=15%, 2=20%, 3=0%
            tipNotClicked = False  # Exit loop
            break
    

    # After tipSelected is set and tip_percent calculated

# Calculate totals
tip_amount = totalPrice * tip_percent
final_total = totalPrice + tip_amount


if tipSelected == 0:
    tip_percent = 0.10
elif tipSelected == 1:
    tip_percent = 0.15
elif tipSelected == 2:
    tip_percent = 0.20  
else:  # tipless
    tip_percent = 0

tax = round(totalPrice * 0.13, 2)
tip_amount = round(totalPrice * tip_percent, 2)
final_total = round(totalPrice + tax + tip_amount, 2)

# Clear tip buttons, show receipt
for obj in [tip10, tip10Txt, tip15, tip15Txt, tip20, tip20Txt, tipless, tiplessTxt]:
    obj.undraw()

# CREATING ELEMENTS FOR THE RECEIPT
subtotalTxt = Text(Point(100, 50), f"Subtotal: ${totalPrice:.2f}")
subtotalTxt.setSize(16)
subtotalTxt.setFace("lilita one")
subtotalTxt.draw(tipMenu)

tipTxt = Text(Point(100, 90), f"Tip ({int(tip_percent*100)}%): ${tip_amount:.2f}")
tipTxt.setSize(16)
tipTxt.setFace("lilita one")
tipTxt.draw(tipMenu)

totalTxt = Text(Point(150, 130), f"Total: ${final_total:.2f}")
totalTxt.setSize(30)
totalTxt.setFace("lilita one")
totalTxt.setTextColor("gold")
totalTxt.draw(tipMenu)

taxIncluded=Text(Point(400,170),"13% HST is included")
taxIncluded.setSize(10)
taxIncluded.setFace("lilita one")
taxIncluded.setTextColor("white")
taxIncluded.draw(tipMenu)

cashRect = Rectangle(Point(600, 140), Point(800, 180))
cashRect.setFill ("green")
cashRect.draw(tipMenu)
cashTxt = Text(Point(700, 160), "Cash")
cashTxt.setFace ('lilita one')
cashTxt.setSize(18)
cashTxt.draw(tipMenu)

cardRect = Rectangle(Point(600,100),Point(800,140))
cardRect.setFill("green")
cardRect.draw(tipMenu)
cardTxt = Text(Point(700,120),"Card")
cardTxt.setFace('lilita one')
cardTxt.setSize(18)
cardTxt.draw(tipMenu)

cashSelected=False
cardSelected=False

#THE FOLLOWING CODE IS FOR DETERMINING WHAT HAPPENS WHEN YOU PRESS CARD OR CASH
while cashSelected==False or cardSelected==False:
    clicked=tipMenu.getMouse()
    if clicked.getX()>600 and clicked.getX()<800 and clicked.getY()>140 and clicked.getY()<180:  #cash
        cashSelected=True
        TwiggyburgerMenu.close()
        tipMenu.close()
        cashMenu=GraphWin("Cash Payment", 700,500)
        cashMenu.setBackground("black")
        prompt=Text(Point(200,100),"Please enter the amount:")
        prompt.setTextColor("gold")
        prompt.setSize (20)
        prompt.setFace('lilita one')
        prompt.draw(cashMenu)
        reminder = Text(Point(240, 200),f"You need to pay a total of ${final_total:.2f}, tax included")
        reminder.setSize(10)
        reminder.setTextColor("white")
        reminder.setSize(15)
        reminder.setFace('lilita one')
        reminder.draw(cashMenu)

        while True:
            input_text = ""
            input_display = Text(Point(350, 330), "$0.00")
            input_display.setSize(40)
            input_display.setFace ("lilita one")
            input_display.setTextColor("gold")
            input_display.draw(cashMenu)
            # Get input
            while True:
                key = cashMenu.getKey()
                if key == 'Return': break
                elif key == 'BackSpace' and input_text: input_text = input_text[:-1]
                elif key.isdigit() and len(input_text) < 8: input_text += key
                input_display.setText(f"${float(input_text or '0'):.2f}")
            
            cash_amount = float(input_text) if input_text else 0.0
            
            if cash_amount >= final_total:
                # Success path when user enters enough cash, creating reciept Window
                change = round(cash_amount - final_total, 2)  #generates change
                cashMenu.close()
                receiptWin = GraphWin("Twiggyburger Receipt", 600, 700)
                receiptWin.setBackground("black")
                restaurant=Text(Point(200,70),"la fishe au fromage")
                restaurant.setFace('determination extended')
                restaurant.setSize(20)
                restaurant.setTextColor("white")
                restaurant.draw(receiptWin)
                

                y_pos = 125
                
                
                itemsTxt = Text(Point(100, y_pos), "Items:")
                itemsTxt.setTextColor("white")
                itemsTxt.setSize(20)
                itemsTxt.setFace('determination extended')
                itemsTxt.draw(receiptWin)
                y_pos += 50

                for i in range(len(orderedItems)):
                    if orderedItems[i] > 0:
                        itemTxt = Text(Point(150, y_pos), food[i]) 
                        itemTxt.setTextColor("white")
                        itemTxt.setSize(14)
                        itemTxt.setFace('determination extended')
                        itemTxt.draw(receiptWin)
                        qtyTxt = Text(Point(350, y_pos), f"x{orderedItems[i]}")
                        qtyTxt.setTextColor("orange")
                        qtyTxt.setSize(14)
                        qtyTxt.setFace('determination extended')
                        qtyTxt.draw(receiptWin)

                        priceTxt = Text(Point(500, y_pos), f"${prices[i]*orderedItems[i]:.2f}")
                        priceTxt.setTextColor("gold")
                        priceTxt.setSize(14)
                        priceTxt.setFace ('determination extended')
                        priceTxt.draw(receiptWin)
                        y_pos+=30
                y_pos += 10
                subtotalTxt = Text(Point(500, y_pos), f"Subtotal: ${totalPrice:.2f}")
                subtotalTxt.setTextColor("white")
                subtotalTxt.setFace('determination extended')
                subtotalTxt.draw(receiptWin)
                y_pos += 30

                tipTxt = Text(Point(500, y_pos), f"Tip ({int(tip_percent*100)}%): ${totalPrice*tip_percent:.2f}")
                tipTxt.setTextColor("white")
                tipTxt.setFace ('determination extended')
                tipTxt.draw(receiptWin)
                y_pos += 30
                
                taxTxt = Text(Point(500, y_pos), f"Taxes (13%): ${tax:.2f}")
                taxTxt.setTextColor("white")
                taxTxt.setFace ('determination extended')
                taxTxt.draw(receiptWin)
                y_pos+=30

                totalTxt = Text(Point(470, y_pos), f"TOTAL: ${final_total:.2f}")
                totalTxt.setSize(20)
                totalTxt.setFace ('determination extended')
                totalTxt.setTextColor("gold")
                totalTxt.draw(receiptWin)
                y_pos += 50

                # Payment details
                payTxt = Text(Point(500, y_pos), f"Cash Paid: ${cash_amount:.2f}")
                payTxt.setTextColor("green")
                payTxt.setFace('determination extended')
                payTxt.draw(receiptWin)
                y_pos += 50

                changeTxt = Text(Point(450, y_pos), f"Change Given: ${change:.2f}")  
                changeTxt.setTextColor("green")
                changeTxt.setSize(16)
                changeTxt.setFace('determination extended')
                changeTxt.draw(receiptWin)
                
                closeReceipt = Rectangle(Point(250,600),Point(350,630))
                closeReceipt.setFill ("green")
                closeReceipt.draw(receiptWin)
                
                closeTxt=Text(Point(300,615),"Close")
                closeTxt.setTextColor("black")
                closeTxt.setFace("determination extended")
                closeTxt.draw(receiptWin)

                tyTxt=Text(Point(300,680),"Thanks for eating at la fishe au fromage")
                tyTxt.setTextColor("gold")
                tyTxt.setFace('determination extended')
                tyTxt.draw(receiptWin)
                # Wait for close click
                while True:
                    click = receiptWin.getMouse()
                    if 250 < click.getX() < 350 and 600 < click.getY() < 630:
                        receiptWin.close()
                break
            else:
                input_display.undraw()
                insufficient = Text(Point(350, 180), f"Not enough! Need ${final_total:.2f}")
                insufficient.setSize(22)
                insufficient.setFace('lilita one')
                insufficient.setTextColor("red")
                insufficient.draw(cashMenu)
                cashMenu.getKey()  # Pause before retry
                insufficient.undraw()
                # In case money entered is not enough, cash input is repeated until the user enters enough
                

    elif clicked.getX()>600 and clicked.getX()<800 and clicked.getY()>100 and clicked.getY()<140:  #card is clicked
        cardSelected=True
        TwiggyburgerMenu.close()
        tipMenu.close()
    
    
        cardSelectWin=GraphWin("Select card",600,130)  #card select window creation
        cardSelectWin.setBackground('black')
        amEx=Rectangle(Point(0,0),Point(200,130))
        amEx.setFill("orange")
        amEx.draw(cardSelectWin)
        amExTxt=Text(Point(100,60),"American Express")
        amExTxt.setFace('lilita one')
        amExTxt.draw(cardSelectWin)
        
        visa=Rectangle(Point(200,0),Point(400,130))
        visa.setFill("orange")
        visa.draw(cardSelectWin)
        visaTxt=Text(Point(300,60),"Visa")
        visaTxt.setFace('lilita one')
        visaTxt.draw(cardSelectWin)
        
        mastercard=Rectangle(Point(400,0),Point(600,130))
        mastercard.setFill("orange")
        mastercard.draw(cardSelectWin)
        mastercardTxt=Text(Point(500,60),"Mastercard")
        mastercardTxt.setFace('lilita one')
        mastercardTxt.draw(cardSelectWin)

        tipHitboxes = [Point(0,0), Point(200,130),# american express
                   Point(200,0), Point(400,130),  # visa  
                   Point(400,0), Point(600,130),  # mastercard
                       ]
        clicked=cardSelectWin.getMouse()
        if clicked.getX()>1 and clicked.getX()<600 and clicked.getY()>1 and clicked.getY()<129:
            back_left, back_top, back_right, back_bottom = 100, 800, 300, 1000
            cardSelectWin.close()
            pinWindow = GraphWin("Enter your pin", 800, 1000)
            pinWindow.setBackground('black')
            cell_width = 200
            cell_height = 200
            start_x = 100
            start_y = 200
            rows = 3   # vertical
            cols = 3   # horizontal
            digit=1
            for r in range(rows):
                for c in range(cols):
                    left   = start_x + c * cell_width
                    top    = start_y + r * cell_height
                    right  = left + cell_width
                    bottom = top + cell_height
                    rect = Rectangle(Point(left, top), Point(right, bottom))
                    rect.setFill("grey")
                    rect.draw(pinWindow)
                    center_x = (left + right) / 2
                    center_y = (top + bottom) / 2

                    # Draw digit 1–9
                    
                    txt = Text(Point(center_x, center_y), str(digit))
                    txt.setSize(50)
                    txt.setTextColor("white")
                    txt.setFace('lilita one')
                    txt.draw(pinWindow)

                    digit += 1
            rectangleLeft=Rectangle(Point(100,800),Point(300,1000))
            rectangleLeft.setFill('red')
            rectangleLeft.draw(pinWindow)
            rectangleMiddle=Rectangle(Point(300,800),Point(500,1000))
            rectangleMiddle.setFill ('grey')
            rectangleMiddle.draw(pinWindow)
            rectangleRight=Rectangle(Point(500,800),Point(700,1000))
            rectangleRight.setFill('green')
            rectangleRight.draw(pinWindow)
            zero_left = start_x + 1 * cell_width          # middle column
            zero_top = start_y + 3 * cell_width          # 4th row (below the 3 rows above)
            zero_right = zero_left + cell_width
            zero_bottom = zero_top + cell_height

            zero_rect = Rectangle(Point(zero_left, zero_top), Point(zero_right, zero_bottom))
            zero_rect.setFill("grey")
            zero_rect.draw(pinWindow)

            zero_txt = Text(Point(400,900),"0")
            zero_txt.setSize(50)
            zero_txt.setFace('lilita one')
            zero_txt.setTextColor("white")
            
            
            backspace=Image(Point(200, 900), "a__pictures/backspace.png")
            backspace.draw(pinWindow)
            tick=Image(Point(600,900), "a__pictures/tick.png")
            tick.draw(pinWindow)

            pin_text = Text(Point(400, 100), "")
            pin_text.setSize(36)
            pin_text.setTextColor("white")
            pin_text.setFace('lilita one')
            pin_text.draw(pinWindow)
            current_pin = ""          # stores the digits, max length 4
            buttons = []              # list of (digit, left, right, top, bottom)

            # Rebuild the 1–9 buttons and remember their hitboxes
            cell_width = 200
            cell_height = 200
            start_x = 100
            start_y = 200
            rows = 3
            cols = 3

            digit = 1
            for r in range(rows):
                for c in range(cols):
                    left= start_x + c * cell_width
                    top= start_y + r * cell_height
                    right= left + cell_width
                    bottom = top + cell_height

                    rect = Rectangle(Point(left, top), Point(right, bottom))
                    rect.setFill("grey")
                    rect.draw(pinWindow)

                    center_x = (left + right) / 2
                    center_y = (top + bottom) / 2

                    txt = Text(Point(center_x, center_y), str(digit))
                    txt.setSize(50)
                    txt.setTextColor("white")
                    txt.setFace('lilita one')
                    txt.draw(pinWindow)

                    buttons.append((str(digit), left, right, top, bottom))
                    digit += 1

            # 0 button (middle of bottom row)
            zero_left  = start_x + 1 * cell_width
            zero_top   = start_y + 3 * cell_height
            zero_right = zero_left + cell_width
            zero_bottom = zero_top + cell_height

            zero_rect = Rectangle(Point(zero_left, zero_top), Point(zero_right, zero_bottom))
            zero_rect.setFill("grey")
            zero_rect.draw(pinWindow)

            zero_txt = Text(Point(400,900),"0")
            zero_txt.setSize(50)
            zero_txt.setFace('lilita one')
            zero_txt.setTextColor("white")
            

            buttons.append(("0", zero_left, zero_right, zero_top, zero_bottom))
            # Bottom buttons and images
            rectangleLeft  = Rectangle(Point(100, 800), Point(300, 1000))   # backspace area
            rectangleLeft.setFill('red')
            rectangleLeft.draw(pinWindow)

            rectangleMiddle = Rectangle(Point(300, 800), Point(500, 1000))  # unused / spacer
            rectangleMiddle.setFill('grey')
            rectangleMiddle.draw(pinWindow)

            rectangleRight = Rectangle(Point(500, 800), Point(700, 1000))   # tick/confirm area
            rectangleRight.setFill('green')
            rectangleRight.draw(pinWindow)

            backspace = Image(Point(200, 900), "a__pictures/backspace.png")
            backspace.draw(pinWindow)

            tick = Image(Point(600, 900), "a__pictures/tick.png")
            tick.draw(pinWindow)
            zero_txt.draw(pinWindow)
            # Hitbox for backspace (matches red rectangle)
            back_left, back_top, back_right, back_bottom = 100, 800, 300, 1000
            # Hitbox for confirm (green rectangle), if I want to use it later
            confirm_left, confirm_top, confirm_right, confirm_bottom = 500, 800, 700, 1000

            # Helper to update the visible PIN (1234)
            def update_pin_display():
                pin_text.setText(current_pin)
            while True:
                click = pinWindow.getMouse()
                x, y = click.getX(), click.getY()

                # backspace clicked
                if back_left <= x <= back_right and back_top <= y <= back_bottom:
                    if current_pin:
                        current_pin = current_pin[:-1]
                        update_pin_display()
                    continue

                # optional: confirm button (do nothing until 4 digits)
                if confirm_left <= x <= confirm_right and confirm_top <= y <= confirm_bottom:
                    if len(current_pin) == 4:
                        # pin complete
                        break
                    else:
                        continue

                # digit buttons (only add if < 4 digits)
                if len(current_pin) < 4:
                    pressed = False
                    for d, left, right, top, bottom in buttons:
                        if left <= x <= right and top <= y <= bottom:
                            current_pin += d
                            update_pin_display()
                            pressed = True
                            break

                    # auto-finish when 4 digits entered if i don’t want a separate confirm
                    if pressed and len(current_pin) == 4:
                        # break  #can be uncommented if i wanted to break immediatly
                        pass
                    
            pinWindow.close()

            #RECEIPT WINDOW CREATION (SAME AS ABOVE)
            receiptWin = GraphWin("Twiggyburger Receipt", 600, 700)
            receiptWin.setBackground("black")

            restaurant = Text(Point(200,70),"la fishe au fromage")
            restaurant.setFace('determination extended')
            restaurant.setSize(20)
            restaurant.setTextColor("white")
            restaurant.draw(receiptWin)

            y_pos = 125
            itemsTxt = Text(Point(100, y_pos), "Items:")
            itemsTxt.setTextColor("white")
            itemsTxt.setSize(20)
            itemsTxt.setFace('determination extended')
            itemsTxt.draw(receiptWin)

            y_pos += 50
            for i in range(len(orderedItems)):
                if orderedItems[i] > 0:
                    itemTxt = Text(Point(150, y_pos), food[i])
                    itemTxt.setTextColor("white")
                    itemTxt.setSize(14)
                    itemTxt.setFace('determination extended')
                    itemTxt.draw(receiptWin)

                    qtyTxt = Text(Point(350, y_pos), f"x{orderedItems[i]}")
                    qtyTxt.setTextColor("orange")
                    qtyTxt.setSize(14)
                    qtyTxt.setFace('determination extended')
                    qtyTxt.draw(receiptWin)

                    priceTxt = Text(Point(500, y_pos), f"${prices[i]*orderedItems[i]:.2f}")
                    priceTxt.setTextColor("gold")
                    priceTxt.setSize(14)
                    priceTxt.setFace('determination extended')
                    priceTxt.draw(receiptWin)
                    y_pos += 30

            # Totals section
            y_pos += 10
            subtotalTxt = Text(Point(500, y_pos), f"Subtotal: ${totalPrice:.2f}")
            subtotalTxt.setTextColor("white")
            subtotalTxt.setFace('determination extended')
            subtotalTxt.draw(receiptWin)

            y_pos += 30
            tipTxt = Text(Point(500, y_pos), f"Tip ({int(tip_percent*100)}%): ${totalPrice*tip_percent:.2f}")
            tipTxt.setTextColor("white")
            tipTxt.setFace('determination extended')
            tipTxt.draw(receiptWin)

            y_pos += 30
            taxTxt = Text(Point(500, y_pos), f"Taxes (13%): ${tax:.2f}")
            taxTxt.setTextColor("white")
            taxTxt.setFace('determination extended')
            taxTxt.draw(receiptWin)

            y_pos += 30
            totalTxt = Text(Point(470, y_pos), f"TOTAL: ${final_total:.2f}")
            totalTxt.setSize(20)
            totalTxt.setFace('determination extended')
            totalTxt.setTextColor("gold")
            totalTxt.draw(receiptWin)

            y_pos += 50
            payTxt = Text(Point(500, y_pos), f"Card Paid: ${final_total:.2f}")
            payTxt.setTextColor("green")
            payTxt.setFace('determination extended')
            payTxt.draw(receiptWin)
            
            closeReceipt = Rectangle(Point(250,600),Point(350,630))
            closeReceipt.setFill ("green")
            closeReceipt.draw(receiptWin)
            
            closeTxt=Text(Point(300,615),"Close")
            closeTxt.setTextColor("black")
            closeTxt.setFace("determination extended")
            closeTxt.draw(receiptWin)

            tyTxt=Text(Point(300,680),"Thanks for eating at la fishe au fromage")
            tyTxt.setTextColor("gold")
            tyTxt.setFace('determination extended')
            tyTxt.draw(receiptWin)
            # Wait for click to close
            while True:
                click = receiptWin.getMouse()
                if 250 < click.getX() < 350 and 600 < click.getY() < 630:
                    receiptWin.close()
        break
    
#670