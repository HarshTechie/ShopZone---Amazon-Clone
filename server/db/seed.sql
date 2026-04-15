-- Default user (no auth, hardcoded as user_id = 1)
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

-- Categories
INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Books'),
  ('Clothing'),
  ('Home & Kitchen'),
  ('Sports'),
  ('Toys');

-- =============================================
-- ELECTRONICS (category_id = 1) — 12 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Wireless Bluetooth Headphones',
  '• Premium active noise cancellation blocks outside noise
• 30-hour battery life with quick charge support
• Deep bass and crystal-clear highs with 40mm drivers
• Comfortable memory foam ear cushions
• Foldable design with carrying case included',
  4999, 50, 1,
  '{"Brand": "SoundMax", "Battery Life": "30 hours", "Connectivity": "Bluetooth 5.3", "Noise Cancellation": "Active ANC", "Driver Size": "40mm", "Weight": "250g", "Charging": "USB-C", "Warranty": "1 Year"}'
),
(
  '4K Ultra HD Smart TV 55 inch',
  '• Stunning 4K UHD display with HDR10+ and Dolby Vision
• Built-in streaming apps — Netflix, Prime Video, YouTube
• Voice control with Alexa and Google Assistant
• 3 HDMI ports and 2 USB ports
• Slim bezel design with wall-mount support',
  38999, 15, 1,
  '{"Brand": "VisionPro", "Screen Size": "55 inches", "Resolution": "3840x2160", "HDR": "HDR10+ / Dolby Vision", "Smart TV": "Yes", "Ports": "3 HDMI, 2 USB", "Speaker": "20W Dolby Audio", "Warranty": "2 Years"}'
),
(
  'Laptop Stand Adjustable Aluminum',
  '• Ergonomic design reduces neck and back strain
• Premium aluminum alloy construction — sturdy and lightweight
• Adjustable height with 6 angle settings
• Compatible with 10-17 inch laptops
• Anti-slip silicone pads protect your device',
  1899, 100, 1,
  '{"Material": "Aluminum Alloy", "Compatibility": "10-17 inch laptops", "Adjustable": "6 angle settings", "Weight Capacity": "10 kg", "Anti-Slip": "Silicone Pads", "Weight": "380g"}'
),
(
  'Wireless Mechanical Keyboard',
  '• Hot-swappable mechanical switches for custom feel
• RGB backlight with 16 million color options
• Dual-mode: Bluetooth 5.0 and USB-C wired
• Compact 75% layout saves desk space
• 4000mAh battery lasts up to 200 hours',
  5499, 40, 1,
  '{"Brand": "KeyCraft", "Switch Type": "Mechanical (Blue)", "Layout": "75%", "Connectivity": "Bluetooth 5.0 / USB-C", "Backlight": "RGB", "Battery": "4000mAh", "Hot-Swap": "Yes", "Warranty": "1 Year"}'
),
(
  'True Wireless Earbuds Pro',
  '• Active noise cancellation with transparency mode
• 28-hour total battery life with charging case
• IPX5 water and sweat resistant
• Touch controls for music, calls, and assistant
• Premium sound with 10mm dynamic drivers',
  3499, 80, 1,
  '{"Brand": "SoundMax", "Battery Life": "28 hours (total)", "Driver Size": "10mm", "ANC": "Yes", "Water Resistance": "IPX5", "Connectivity": "Bluetooth 5.2", "Charging": "USB-C / Wireless", "Warranty": "1 Year"}'
),
(
  'USB-C Hub 7-in-1 Multiport Adapter',
  '• 7 ports: HDMI 4K, USB 3.0 x2, USB-C PD, SD/TF card reader, Ethernet
• 100W Power Delivery passthrough charging
• 4K@60Hz HDMI output for external displays
• Plug and play — no drivers needed
• Compact aluminum body with braided cable',
  2499, 120, 1,
  '{"Ports": "HDMI, 2x USB 3.0, USB-C PD, SD, TF, Ethernet", "HDMI Output": "4K@60Hz", "Power Delivery": "100W", "Material": "Aluminum", "Cable": "Braided", "Compatibility": "USB-C devices"}'
),
(
  'Portable Bluetooth Speaker',
  '• 360-degree immersive sound with deep bass
• IPX7 waterproof — pool and shower friendly
• 24-hour battery life on a single charge
• Built-in microphone for hands-free calls
• Pair two speakers for stereo sound',
  2999, 65, 1,
  '{"Brand": "BoomBox", "Battery Life": "24 hours", "Waterproof": "IPX7", "Output": "20W", "Bluetooth": "5.0", "Weight": "540g", "Warranty": "1 Year"}'
),
(
  'Webcam Full HD 1080p',
  '• Full HD 1080p at 30fps for crisp video calls
• Built-in dual stereo microphone with noise reduction
• Auto light correction for low-light environments
• Wide-angle 110-degree field of view
• Universal clip fits laptops and monitors',
  2199, 90, 1,
  '{"Resolution": "1080p @ 30fps", "Microphone": "Dual Stereo", "Field of View": "110 degrees", "Auto Focus": "Yes", "Light Correction": "Auto", "Mount": "Universal Clip"}'
),
(
  'Wireless Gaming Mouse',
  '• Ultra-fast 25K DPI optical sensor for precision
• 70-hour battery life with RGB lighting
• 6 programmable buttons with onboard memory
• Lightweight at just 80g — no drag
• USB-C charging with 15 min quick charge',
  2799, 55, 1,
  '{"Brand": "SwiftClick", "DPI": "25,000", "Buttons": "6 Programmable", "Battery": "70 hours", "Weight": "80g", "Connectivity": "2.4GHz / Bluetooth", "Charging": "USB-C Quick Charge"}'
),
(
  'Power Bank 20000mAh Fast Charge',
  '• 20000mAh capacity charges phone 4-5 times
• 22.5W fast charging for phones and tablets
• Dual USB-A + USB-C output ports
• LED battery indicator display
• Compact design with anti-slip surface',
  1499, 200, 1,
  '{"Capacity": "20000mAh", "Fast Charge": "22.5W", "Ports": "2x USB-A, 1x USB-C", "Input": "USB-C / Micro-USB", "Display": "LED Indicator", "Weight": "350g", "Warranty": "6 Months"}'
),
(
  'Smartwatch Fitness Tracker',
  '• 1.4 inch AMOLED display with always-on mode
• Heart rate, SpO2, and sleep tracking
• 100+ sports modes with GPS tracking
• 14-day battery life on a single charge
• IP68 water resistant for swimming',
  3999, 45, 1,
  '{"Display": "1.4 inch AMOLED", "Battery Life": "14 days", "Sensors": "Heart Rate, SpO2, Accelerometer", "Sports Modes": "100+", "GPS": "Built-in", "Water Resistance": "IP68", "Warranty": "1 Year"}'
),
(
  'Noise Cancelling Neckband Earphones',
  '• Active noise cancellation for focused listening
• 30-hour battery with magnetic auto on/off
• Fast charge: 10 min charge gives 10 hours playback
• IPX5 sweat and splash resistant
• Dual device connection via Bluetooth 5.2',
  1999, 110, 1,
  '{"Brand": "SoundMax", "Battery Life": "30 hours", "ANC": "Yes", "Fast Charge": "10 min = 10 hours", "Water Resistance": "IPX5", "Bluetooth": "5.2", "Weight": "30g"}'
);

-- =============================================
-- BOOKS (category_id = 2) — 12 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Atomic Habits by James Clear',
  '• Learn the proven system for building good habits and breaking bad ones
• Discover the four laws of behaviour change
• Real-world examples from Olympic athletes, business leaders, and artists
• Tiny changes lead to remarkable results
• No. 1 New York Times Bestseller',
  399, 300, 2,
  '{"Author": "James Clear", "Pages": "320", "Format": "Paperback", "Language": "English", "Publisher": "Penguin Random House", "ISBN": "978-0735211292"}'
),
(
  'Clean Code: A Handbook of Agile Software',
  '• Learn to write clean, readable, and maintainable code
• Covers naming, functions, comments, formatting, and error handling
• Real-world case studies and code refactoring examples
• Essential reading for every software developer
• Written by legendary software craftsman Robert C. Martin',
  599, 150, 2,
  '{"Author": "Robert C. Martin", "Pages": "464", "Format": "Paperback", "Language": "English", "Publisher": "Pearson", "ISBN": "978-0132350884"}'
),
(
  'The Psychology of Money',
  '• 19 short stories exploring the strange ways people think about money
• Why behaviour matters more than knowledge in finance
• Lessons on wealth, greed, and happiness
• Over 3 million copies sold worldwide
• Perfect for anyone who wants a better relationship with money',
  349, 250, 2,
  '{"Author": "Morgan Housel", "Pages": "256", "Format": "Paperback", "Language": "English", "Publisher": "Harriman House", "ISBN": "978-0857197689"}'
),
(
  'System Design Interview Vol. 1',
  '• Step-by-step framework for system design interviews
• Covers URL shortener, chat system, news feed, and more
• Clear diagrams and real-world architecture patterns
• Trusted by thousands of engineers at FAANG companies
• Updated with latest industry practices',
  799, 120, 2,
  '{"Author": "Alex Xu", "Pages": "322", "Format": "Paperback", "Language": "English", "Publisher": "Byte Code LLC", "ISBN": "978-1736049501"}'
),
(
  'Rich Dad Poor Dad',
  '• What the rich teach their kids about money that the poor do not
• Challenge conventional thinking about work and money
• Learn the difference between assets and liabilities
• Over 32 million copies sold in 109 countries
• The #1 personal finance book of all time',
  349, 400, 2,
  '{"Author": "Robert T. Kiyosaki", "Pages": "336", "Format": "Paperback", "Language": "English", "Publisher": "Plata Publishing", "ISBN": "978-1612681139"}'
),
(
  'Cracking the Coding Interview',
  '• 189 programming questions and detailed solutions
• Covers data structures, algorithms, and system design
• Tips from real interviews at Google, Amazon, Microsoft
• Big-O time and space complexity for every solution
• The definitive guide for tech interview preparation',
  699, 180, 2,
  '{"Author": "Gayle Laakmann McDowell", "Pages": "687", "Format": "Paperback", "Language": "English", "Publisher": "CareerCup", "ISBN": "978-0984782857"}'
),
(
  'Sapiens: A Brief History of Humankind',
  '• Explores 70,000 years of human history
• From the Cognitive Revolution to the Scientific Revolution
• How biology and history have defined the human experience
• International bestseller translated into 65 languages
• A must-read for understanding the modern world',
  449, 200, 2,
  '{"Author": "Yuval Noah Harari", "Pages": "464", "Format": "Paperback", "Language": "English", "Publisher": "Vintage", "ISBN": "978-0099590088"}'
),
(
  'The Pragmatic Programmer',
  '• Classic guide to software development best practices
• Tips on writing flexible, adaptable, and reusable code
• Covers testing, debugging, and project management
• Updated 20th Anniversary Edition with modern examples
• A career-defining book for developers',
  649, 100, 2,
  '{"Author": "David Thomas, Andrew Hunt", "Pages": "352", "Format": "Paperback", "Language": "English", "Publisher": "Addison-Wesley", "ISBN": "978-0135957059"}'
),
(
  'Deep Work by Cal Newport',
  '• Rules for focused success in a distracted world
• Learn to master deep concentration and produce elite work
• Practical strategies to minimize shallow work
• Case studies from successful professionals
• Essential for knowledge workers and students',
  399, 170, 2,
  '{"Author": "Cal Newport", "Pages": "296", "Format": "Paperback", "Language": "English", "Publisher": "Grand Central Publishing", "ISBN": "978-1455586691"}'
),
(
  'Introduction to Algorithms (CLRS)',
  '• The definitive textbook on algorithms and data structures
• Comprehensive coverage: sorting, graphs, dynamic programming
• Rigorous mathematical foundations with practical applications
• Used by top universities worldwide
• Fourth edition with updated content',
  899, 80, 2,
  '{"Author": "Cormen, Leiserson, Rivest, Stein", "Pages": "1312", "Format": "Hardcover", "Language": "English", "Publisher": "MIT Press", "Edition": "4th", "ISBN": "978-0262046305"}'
),
(
  'Thinking, Fast and Slow',
  '• Explores the two systems that drive the way we think
• System 1: fast, intuitive. System 2: slow, deliberate
• Nobel Prize winner Daniel Kahneman reveals cognitive biases
• How decisions shape our lives and businesses
• A groundbreaking work in behavioural economics',
  449, 190, 2,
  '{"Author": "Daniel Kahneman", "Pages": "499", "Format": "Paperback", "Language": "English", "Publisher": "Penguin", "ISBN": "978-0374533557"}'
),
(
  'The Lean Startup',
  '• How modern entrepreneurs use continuous innovation
• Build-Measure-Learn feedback loop explained
• Validated learning and minimum viable product concepts
• Real startup stories from Silicon Valley
• Essential for founders and product managers',
  399, 160, 2,
  '{"Author": "Eric Ries", "Pages": "336", "Format": "Paperback", "Language": "English", "Publisher": "Currency", "ISBN": "978-0307887894"}'
);

-- =============================================
-- CLOTHING (category_id = 3) — 12 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Classic Fit Cotton T-Shirt',
  '• 100% premium combed cotton for extra softness
• Classic fit — not too tight, not too loose
• Pre-shrunk fabric maintains shape after washing
• Reinforced crew neck collar
• Available in multiple colors',
  599, 500, 3,
  '{"Material": "100% Cotton", "Fit": "Classic", "Neck": "Crew", "Care": "Machine Washable", "Sizes": "S, M, L, XL, XXL", "Origin": "India"}'
),
(
  'Slim Fit Denim Jeans',
  '• Modern slim fit with comfortable stretch
• Dark wash finish with classic five-pocket design
• Durable denim with 2% elastane for flexibility
• Mid-rise waist for everyday comfort
• Versatile — dress up or keep it casual',
  1499, 120, 3,
  '{"Material": "98% Cotton, 2% Elastane", "Fit": "Slim", "Rise": "Mid", "Wash": "Dark Indigo", "Sizes": "28-40", "Care": "Machine Wash Cold"}'
),
(
  'Waterproof Winter Jacket',
  '• Waterproof outer shell keeps you dry in heavy rain
• Synthetic down insulation rated to -10°C
• Adjustable hood with fleece-lined collar
• Multiple zippered pockets for secure storage
• Lightweight and packable for travel',
  3999, 60, 3,
  '{"Material": "Polyester Shell", "Insulation": "Synthetic Down", "Waterproof": "Yes (10,000mm)", "Hood": "Adjustable & Removable", "Temperature": "-10°C", "Sizes": "S-XXL"}'
),
(
  'Formal Slim Fit Shirt',
  '• Premium cotton-polyester blend for wrinkle resistance
• Slim fit tailored cut for a modern silhouette
• Spread collar suitable for tie or open neck
• Available in solid colors and subtle patterns
• Perfect for office, meetings, and formal events',
  1299, 200, 3,
  '{"Material": "60% Cotton, 40% Polyester", "Fit": "Slim", "Collar": "Spread", "Cuff": "Button", "Care": "Machine Washable", "Sizes": "S-XXL"}'
),
(
  'Jogger Track Pants',
  '• Soft fleece-lined interior for warmth
• Elasticated waistband with drawstring for adjustable fit
• Tapered leg with ribbed ankle cuffs
• Two side pockets and one back pocket
• Perfect for gym, running, or lounging',
  899, 350, 3,
  '{"Material": "Cotton-Polyester Blend", "Fit": "Tapered Jogger", "Lining": "Fleece", "Pockets": "3", "Care": "Machine Washable", "Sizes": "S-XXL"}'
),
(
  'Hooded Pullover Sweatshirt',
  '• Heavy-weight 350 GSM fleece for extra warmth
• Kangaroo pocket keeps hands warm
• Adjustable drawstring hood
• Ribbed cuffs and hem retain shape
• Relaxed fit for comfortable layering',
  1199, 180, 3,
  '{"Material": "80% Cotton, 20% Polyester", "Weight": "350 GSM", "Fit": "Relaxed", "Hood": "Drawstring", "Pockets": "Kangaroo", "Sizes": "S-XXL"}'
),
(
  'Printed Casual Polo T-Shirt',
  '• Breathable pique cotton fabric
• Classic polo collar with 2-button placket
• Subtle printed pattern for a stylish look
• Side vents for ease of movement
• Great for casual outings and weekend wear',
  799, 250, 3,
  '{"Material": "100% Pique Cotton", "Fit": "Regular", "Collar": "Polo", "Buttons": "2", "Care": "Machine Washable", "Sizes": "S-XXL"}'
),
(
  'Leather Belt Genuine',
  '• Genuine leather construction — ages beautifully
• Classic prong buckle in brushed nickel finish
• 35mm width suitable for formal and casual wear
• Reinforced stitching along edges
• Adjustable — trim to your exact size',
  699, 400, 3,
  '{"Material": "Genuine Leather", "Width": "35mm", "Buckle": "Brushed Nickel Prong", "Adjustable": "Trimmable", "Sizes": "28-44"}'
),
(
  'Running Sneakers Breathable Mesh',
  '• Ultra-lightweight breathable mesh upper
• Responsive foam sole absorbs impact
• Flexible rubber outsole for grip on all surfaces
• Padded collar and tongue for ankle support
• Ideal for running, gym, and everyday wear',
  2499, 150, 3,
  '{"Material": "Mesh + Synthetic", "Sole": "Rubber + Foam", "Closure": "Lace-Up", "Weight": "280g", "Sizes": "6-12 UK"}'
),
(
  'Cotton Boxer Shorts Pack of 3',
  '• 100% combed cotton for all-day comfort
• Breathable fabric keeps you cool
• Elastic waistband that does not dig in
• Pack of 3 in assorted colors
• Tagless for itch-free wearing',
  499, 600, 3,
  '{"Material": "100% Combed Cotton", "Pack": "3 Pieces", "Waistband": "Elastic", "Fit": "Regular", "Care": "Machine Washable"}'
),
(
  'Aviator Sunglasses UV400',
  '• Classic aviator frame in lightweight metal
• UV400 lenses block 100% of harmful UV rays
• Polarized lenses reduce glare
• Spring-loaded temple tips for secure fit
• Includes hard case and cleaning cloth',
  999, 300, 3,
  '{"Frame": "Metal", "Lens": "UV400 Polarized", "Style": "Aviator", "Includes": "Hard Case + Cloth", "Gender": "Unisex"}'
),
(
  'Woolen Winter Cap Beanie',
  '• Soft acrylic-wool blend for warmth without itch
• Double-layered knit for insulation
• Stretchable one-size-fits-most design
• Foldable brim for style variations
• Unisex design in classic colors',
  349, 450, 3,
  '{"Material": "Acrylic-Wool Blend", "Layers": "Double Knit", "Size": "One Size", "Gender": "Unisex", "Care": "Hand Wash"}'
);

-- =============================================
-- HOME & KITCHEN (category_id = 4) — 12 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Stainless Steel Coffee Maker 12 Cup',
  '• Programmable 12-cup coffee maker with 24-hour timer
• Thermal stainless steel carafe keeps coffee hot for 4 hours
• Brew strength selector: regular or bold
• Anti-drip feature lets you pour while brewing
• Removable filter basket for easy cleaning',
  3499, 80, 4,
  '{"Capacity": "12 cups (1.5L)", "Material": "Stainless Steel", "Programmable": "24-hour timer", "Carafe": "Thermal", "Brew Strength": "Regular / Bold", "Warranty": "1 Year"}'
),
(
  'Non-Stick Cookware Set 10 Piece',
  '• Complete set: 2 frying pans, 2 saucepans, 1 stockpot + 5 lids
• Premium 3-layer non-stick coating — PFOA free
• Heavy-gauge aluminum for even heat distribution
• Cool-touch bakelite handles
• Dishwasher safe and induction compatible',
  4999, 45, 4,
  '{"Pieces": "10", "Material": "Aluminum + Non-Stick", "Coating": "3-Layer PFOA Free", "Induction": "Compatible", "Dishwasher Safe": "Yes", "Handles": "Cool-Touch Bakelite"}'
),
(
  'Memory Foam Pillow Set of 2',
  '• Cooling gel-infused memory foam for temperature regulation
• Contoured design supports neck and spine alignment
• Hypoallergenic and dust mite resistant
• Breathable bamboo-derived cover — removable and washable
• Medium firm support for back and side sleepers',
  1999, 200, 4,
  '{"Quantity": "2 Pack", "Material": "Memory Foam", "Cooling": "Gel-Infused", "Cover": "Bamboo-Derived", "Hypoallergenic": "Yes", "Firmness": "Medium"}'
),
(
  'LED Desk Lamp with USB Charging',
  '• 5 color temperatures and 7 brightness levels (35 modes)
• Built-in USB-A charging port for phone/tablet
• Flexible gooseneck for perfect angle adjustment
• Eye-caring flicker-free LED — no blue light
• Touch controls with 30-minute auto-off timer',
  1799, 150, 4,
  '{"Light Type": "LED (Eye-Care)", "Modes": "35 (5 colors x 7 brightness)", "USB Port": "USB-A", "Arm": "Flexible Gooseneck", "Timer": "30 min auto-off", "Power": "12W"}'
),
(
  'Electric Kettle 1.8L Stainless Steel',
  '• 1500W rapid boil — boils water in under 5 minutes
• 1.8L capacity — perfect for family use
• Auto shut-off and boil-dry protection
• 360-degree rotating base for left or right hand
• Concealed heating element for easy cleaning',
  1299, 120, 4,
  '{"Capacity": "1.8 Litres", "Power": "1500W", "Material": "Stainless Steel", "Safety": "Auto Shut-Off, Boil-Dry Protection", "Base": "360° Rotating", "Warranty": "1 Year"}'
),
(
  'Digital Kitchen Weighing Scale',
  '• Precision sensors for accuracy up to 1g
• Max capacity 10 kg for all your cooking needs
• Tare function for easy ingredient measuring
• Large LCD display with backlight
• Sleek tempered glass platform — easy to clean',
  799, 180, 4,
  '{"Capacity": "10 kg", "Precision": "1g", "Display": "LCD Backlit", "Platform": "Tempered Glass", "Tare Function": "Yes", "Power": "2x AAA batteries"}'
),
(
  'Vacuum Insulated Water Bottle 1L',
  '• Double-wall vacuum insulation: hot 12h, cold 24h
• Food-grade 304 stainless steel — BPA free
• Leak-proof lid with one-hand open mechanism
• Wide mouth for ice cubes and easy cleaning
• Powder-coated finish for grip and durability',
  899, 250, 4,
  '{"Capacity": "1 Litre", "Material": "304 Stainless Steel", "Insulation": "Double-Wall Vacuum", "Hot": "12 hours", "Cold": "24 hours", "BPA Free": "Yes"}'
),
(
  'Microfiber Bed Sheet Set King Size',
  '• Ultra-soft brushed microfiber — softer than cotton
• Set includes: 1 flat sheet, 1 fitted sheet, 2 pillowcases
• Deep pockets fit mattresses up to 16 inches
• Wrinkle, fade, and stain resistant
• Machine washable — maintains softness after washes',
  1599, 100, 4,
  '{"Size": "King", "Material": "Microfiber", "Thread Count": "1800", "Includes": "Flat Sheet + Fitted Sheet + 2 Pillowcases", "Pocket Depth": "16 inches", "Care": "Machine Washable"}'
),
(
  'Plastic Storage Container Set 12pc',
  '• 12 containers with snap-lock airtight lids
• BPA-free food-grade plastic
• Stackable design saves pantry space
• Freezer, microwave, and dishwasher safe
• Transparent body for easy identification',
  699, 160, 4,
  '{"Pieces": "12 Containers + 12 Lids", "Material": "BPA-Free Plastic", "Airtight": "Snap-Lock Lids", "Microwave Safe": "Yes", "Dishwasher Safe": "Yes", "Freezer Safe": "Yes"}'
),
(
  'Wall Clock Silent Non-Ticking 12 inch',
  '• Silent quartz movement — no ticking noise
• Large 12-inch face with clear numbers
• Modern minimalist design suits any room
• Glass front cover with metal frame
• Requires 1 AA battery (not included)',
  599, 140, 4,
  '{"Diameter": "12 inches", "Movement": "Silent Quartz", "Frame": "Metal", "Cover": "Glass", "Style": "Minimalist", "Power": "1x AA Battery"}'
),
(
  'Cutting Board Set Bamboo 3 Pack',
  '• Set of 3 sizes: small, medium, and large
• 100% organic bamboo — naturally antimicrobial
• Knife-friendly surface preserves blade sharpness
• Juice grooves prevent spills on countertop
• Easy grip handles for comfortable use',
  899, 130, 4,
  '{"Pieces": "3 (S, M, L)", "Material": "100% Organic Bamboo", "Antimicrobial": "Natural", "Features": "Juice Grooves + Handles", "Care": "Hand Wash", "Eco-Friendly": "Yes"}'
),
(
  'French Press Coffee Maker 600ml',
  '• Classic French press for rich, full-bodied coffee
• Borosilicate glass carafe — heat resistant
• 4-level stainless steel filtration system
• Makes 3-4 cups of coffee or tea
• Also perfect for frothing milk',
  999, 110, 4,
  '{"Capacity": "600ml (3-4 cups)", "Material": "Borosilicate Glass + Steel", "Filter": "4-Level Stainless Steel", "Dishwasher Safe": "Yes (disassembled)", "Use": "Coffee, Tea, Milk Frothing"}'
);

-- =============================================
-- SPORTS (category_id = 5) — 12 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Yoga Mat Premium 6mm TPE',
  '• Extra thick 6mm cushioning protects joints
• Non-slip textured surface on both sides
• Lightweight TPE material — eco-friendly and durable
• Includes carrying strap for easy transport
• Free from PVC, latex, and toxic chemicals',
  1299, 200, 5,
  '{"Thickness": "6mm", "Material": "TPE (Eco-Friendly)", "Non-Slip": "Both Sides", "Size": "183 x 61 cm", "Includes": "Carrying Strap", "Weight": "800g"}'
),
(
  'Adjustable Dumbbell Set 2-24 kg',
  '• Replaces 12 pairs of dumbbells — saves space
• Quick-change dial mechanism — switch weight in seconds
• Premium steel plates with durable coating
• Ergonomic handle with non-slip grip
• Perfect for home gym — covers beginner to advanced',
  8999, 25, 5,
  '{"Weight Range": "2-24 kg per dumbbell", "Adjustable": "Dial Mechanism", "Material": "Steel + Coating", "Handle": "Ergonomic Non-Slip", "Plates": "12 weight settings", "Warranty": "1 Year"}'
),
(
  'Running Shoes Lightweight Mesh',
  '• Ultra-breathable mesh upper keeps feet cool
• Responsive foam cushioning reduces impact
• Flexible rubber outsole for all-surface grip
• Padded collar for ankle support and comfort
• Weighs just 280g — feels like walking on air',
  2999, 90, 5,
  '{"Material": "Mesh + Synthetic", "Sole": "Rubber + EVA Foam", "Cushioning": "Responsive Foam", "Weight": "280g", "Closure": "Lace-Up", "Sizes": "6-12 UK"}'
),
(
  'Resistance Bands Set of 5',
  '• 5 resistance levels: extra light to extra heavy
• Natural latex construction — durable and snap-resistant
• Ideal for strength training, stretching, and rehab
• Compact and portable — train anywhere
• Includes door anchor, handles, and ankle straps',
  699, 300, 5,
  '{"Bands": "5 Resistance Levels", "Material": "Natural Latex", "Includes": "Door Anchor, 2 Handles, 2 Ankle Straps, Carry Bag", "Max Resistance": "150 lbs combined", "Use": "Strength, Stretching, Rehab"}'
),
(
  'Stainless Steel Water Bottle 750ml Sports',
  '• Single-wall stainless steel for lightweight carry
• Leak-proof flip-top lid with lock mechanism
• Wide mouth opening for easy filling and cleaning
• Carabiner clip attaches to bags
• BPA-free and food-grade safe',
  499, 350, 5,
  '{"Capacity": "750ml", "Material": "Stainless Steel", "Lid": "Flip-Top with Lock", "BPA Free": "Yes", "Includes": "Carabiner Clip", "Weight": "200g"}'
),
(
  'Skipping Rope Adjustable Speed',
  '• Ball bearing handles for smooth, tangle-free rotation
• Adjustable steel cable — fits all heights
• Comfortable foam grip handles
• Perfect for cardio, boxing, and HIIT workouts
• Lightweight and portable',
  399, 400, 5,
  '{"Cable": "Adjustable Steel", "Handles": "Foam Grip + Ball Bearing", "Length": "Adjustable (up to 3m)", "Use": "Cardio, Boxing, HIIT", "Weight": "180g"}'
),
(
  'Cricket Bat English Willow',
  '• Grade A English willow for premium stroke play
• Full-size SH (Short Handle) for adult players
• Singapore cane handle with rubber grip
• Naturally dried and pressed for optimal performance
• Includes premium bat cover',
  4999, 30, 5,
  '{"Material": "Grade A English Willow", "Handle": "SH (Short Handle)", "Grip": "Rubber", "Weight": "1.1-1.3 kg", "Includes": "Bat Cover", "Suitable For": "Adult Players"}'
),
(
  'Football Official Size 5',
  '• FIFA quality standards — size 5 match ball
• Machine-stitched TPU panels for durability
• Butyl bladder for excellent air retention
• Textured surface for better grip and control
• Suitable for grass and turf surfaces',
  999, 150, 5,
  '{"Size": "5 (Official)", "Material": "TPU Machine-Stitched", "Bladder": "Butyl", "Weight": "420-445g", "Surface": "Grass / Turf", "Standard": "FIFA Quality"}'
),
(
  'Gym Gloves with Wrist Support',
  '• Premium leather palm for superior grip
• Integrated wrist wrap provides joint support
• Breathable mesh back keeps hands cool
• Padded palm reduces calluses and blisters
• Hook-and-loop closure for secure fit',
  599, 200, 5,
  '{"Material": "Leather + Mesh", "Wrist Support": "Integrated Wrap", "Padding": "Foam Padded Palm", "Closure": "Hook-and-Loop", "Sizes": "S-XL", "Use": "Weightlifting, Gym"}'
),
(
  'Badminton Racket Set of 2',
  '• Lightweight aluminum frame — ideal for beginners
• High tension nylon strings for consistent shots
• Includes 2 rackets and 3 nylon shuttlecocks
• Isometric head shape for larger sweet spot
• PU grip handles with cushioned wrap',
  1299, 80, 5,
  '{"Frame": "Aluminum", "Strings": "High Tension Nylon", "Includes": "2 Rackets + 3 Shuttlecocks", "Head Shape": "Isometric", "Grip": "PU Cushioned", "Suitable For": "Beginners"}'
),
(
  'Foam Roller for Muscle Recovery',
  '• High-density EVA foam — firm yet comfortable
  • Textured surface targets deep tissue knots
• 45 cm length — ideal for back, legs, and arms
• Lightweight and portable for gym or home
• Helps reduce soreness and improve flexibility',
  799, 160, 5,
  '{"Material": "High-Density EVA Foam", "Length": "45 cm", "Diameter": "15 cm", "Surface": "Textured", "Weight": "400g", "Use": "Muscle Recovery, Stretching"}'
),
(
  'Pull Up Bar Doorway Mount',
  '• Fits standard doorframes 63-100 cm wide
• Heavy-duty steel supports up to 130 kg
• No screws or drilling required — tension mount
• Foam-padded grips prevent slipping
• Multiple grip positions: wide, narrow, neutral',
  1499, 70, 5,
  '{"Material": "Heavy-Duty Steel", "Weight Capacity": "130 kg", "Doorframe Width": "63-100 cm", "Mount": "Tension (No Drilling)", "Grips": "Foam-Padded, Multiple Positions", "Warranty": "6 Months"}'
);

-- =============================================
-- TOYS (category_id = 6) — 10 products
-- =============================================
INSERT INTO products (name, description, price, stock, category_id, specifications) VALUES
(
  'Building Blocks Set 1000 Pieces',
  '• 1000 colorful interlocking bricks in various shapes
• Compatible with all major building block brands
• Includes wheels, windows, doors, and baseplate
• Idea booklet with 50+ building designs
• Develops creativity, problem-solving, and motor skills',
  1999, 150, 6,
  '{"Pieces": "1000", "Age Range": "6+", "Compatible": "Major Brands", "Includes": "Baseplate + Wheels + Booklet", "Material": "ABS Plastic (Non-Toxic)", "Warranty": "6 Months"}'
),
(
  'Remote Control Racing Car High Speed',
  '• High-speed RC car reaches up to 40 km/h
• 2.4GHz remote control with 80m range
• Rechargeable 1200mAh battery — 30 min runtime
• All-terrain rubber tires with shock absorbers
• LED headlights for night racing',
  2499, 70, 6,
  '{"Speed": "40 km/h", "Battery": "1200mAh Rechargeable", "Remote Range": "80m", "Tires": "All-Terrain Rubber", "Scale": "1:18", "Age Range": "8+", "Includes": "Car + Remote + Charger"}'
),
(
  'Board Game Strategy Collection',
  '• Collection of 3 award-winning strategy board games
• Includes dice, cards, tokens, and game boards
• 2-6 players — perfect for family game nights
• Each game plays in 30-60 minutes
• Develops strategic thinking and social skills',
  2999, 85, 6,
  '{"Games Included": "3", "Players": "2-6", "Age Range": "8+", "Play Time": "30-60 min each", "Includes": "Boards, Cards, Dice, Tokens", "Material": "Premium Cardboard + Plastic"}'
),
(
  'Science Experiment Kit for Kids',
  '• 65+ science experiments covering chemistry, physics, and biology
• Safe, non-toxic materials with detailed instruction guide
• Includes test tubes, goggles, and lab tools
• STEM certified — educational and fun
• Perfect birthday or holiday gift',
  1499, 90, 6,
  '{"Experiments": "65+", "Subjects": "Chemistry, Physics, Biology", "Safety": "Non-Toxic, Goggles Included", "STEM Certified": "Yes", "Age Range": "8-14", "Includes": "Lab Kit + Instruction Guide"}'
),
(
  'Magnetic Drawing Board Large',
  '• Large 12x15 inch drawing surface
• 4-color zones: red, blue, green, yellow
• Slide eraser clears screen instantly
• 3 magnetic stamps included (circle, star, square)
• No mess, no ink — reusable unlimited times',
  699, 200, 6,
  '{"Drawing Area": "12 x 15 inches", "Colors": "4 (Red, Blue, Green, Yellow)", "Stamps": "3 Included", "Eraser": "Slide-to-Clear", "Age Range": "3+", "Material": "Non-Toxic Plastic"}'
),
(
  'Plush Teddy Bear 60cm',
  '• Super soft premium plush fabric
• 60cm tall — perfect cuddle companion
• Hypoallergenic and child-safe materials
• Embroidered eyes (no small parts for safety)
• Machine washable — easy to keep clean',
  899, 180, 6,
  '{"Height": "60 cm", "Material": "Premium Plush", "Filling": "PP Cotton", "Eyes": "Embroidered (Child-Safe)", "Hypoallergenic": "Yes", "Care": "Machine Washable", "Age Range": "0+"}'
),
(
  'Kids Bicycle with Training Wheels 16 inch',
  '• Sturdy steel frame with vibrant color finish
• Removable training wheels for learning to ride
• Adjustable seat height grows with your child
• Hand brakes and coaster brake for dual stopping
• Includes bell, reflectors, and chain guard',
  5999, 20, 6,
  '{"Wheel Size": "16 inch", "Frame": "Steel", "Brakes": "Hand + Coaster", "Training Wheels": "Removable", "Age Range": "4-7 years", "Includes": "Bell, Reflectors, Chain Guard", "Max Weight": "35 kg"}'
),
(
  'Puzzle Set 500 Pieces World Map',
  '• 500-piece jigsaw puzzle featuring a colorful world map
• Finished size: 50 x 35 cm
• Precision-cut pieces for perfect interlocking
• Educational — learn countries, capitals, and geography
• Premium glossy finish resists fading',
  499, 120, 6,
  '{"Pieces": "500", "Finished Size": "50 x 35 cm", "Theme": "World Map", "Material": "Premium Cardboard", "Finish": "Glossy", "Age Range": "8+", "Educational": "Geography"}'
),
(
  'Play-Doh Modeling Compound 12 Pack',
  '• 12 cans of assorted vibrant colors
• Non-toxic, water-based formula — safe for kids
• Soft and easy to mold — encourages creativity
• Reusable — store in cans to keep fresh
• Each can contains 112g of compound',
  599, 250, 6,
  '{"Cans": "12", "Weight": "112g per can", "Material": "Water-Based (Non-Toxic)", "Colors": "12 Assorted", "Reusable": "Yes", "Age Range": "2+", "Safety": "Non-Toxic"}'
),
(
  'Nerf Blaster Elite 2.0 with 20 Darts',
  '• Fires foam darts up to 27 meters
• Slam-fire action for rapid blasting
• 6-dart rotating barrel with tactical rail
• Includes 20 official Nerf Elite foam darts
• Lightweight design for comfortable play',
  1799, 60, 6,
  '{"Range": "27 meters", "Darts Included": "20", "Barrel": "6-Dart Rotating", "Action": "Slam-Fire", "Material": "Durable Plastic", "Age Range": "8+", "Dart Type": "Nerf Elite Foam"}'
);

-- =============================================
-- PRODUCT IMAGES — LOCAL files served from /images/
-- Every path is a fixed local file. No external URLs. No randomness.
-- Each product gets exactly 2 images: primary + secondary.
-- =============================================

-- ELECTRONICS (products 1-12) — from images/electronics/ subfolder
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (1, '/images/electronics/Wireless Bluetooth Headphones.jpg', true, 0),
  (1, '/images/electronics/Wireless Bluetooth Headphones2.jpg', false, 1),
  (2, '/images/electronics/4K Ultra HD Smart TV 55 inch.jpg', true, 0),
  (2, '/images/electronics/4K Ultra HD Smart TV 55 inch2.jpg', false, 1),
  (3, '/images/electronics/Laptop Stand Adjustable Aluminum.jpg', true, 0),
  (3, '/images/electronics/Laptop Stand Adjustable Aluminum2.jpg', false, 1),
  (4, '/images/electronics/Wireless Mechanical Keyboard.jpg', true, 0),
  (4, '/images/electronics/Wireless Mechanical Keyboard2.jpg', false, 1),
  (5, '/images/electronics/True Wireless Earbuds Pro.jpg', true, 0),
  (5, '/images/electronics/True Wireless Earbuds Pro2.jpg', false, 1),
  (6, '/images/electronics/USB-C Hub 7-in-1 Multiport Adapter.jpg', true, 0),
  (6, '/images/electronics/USB-C Hub 7-in-1 Multiport Adapter2.jpg', false, 1),
  (7, '/images/electronics/Portable Bluetooth Speaker.jpg', true, 0),
  (7, '/images/electronics/Portable Bluetooth Speaker2.jpg', false, 1),
  (8, '/images/electronics/Webcam Full HD 1080p.jpg', true, 0),
  (8, '/images/electronics/Webcam Full HD 1080p2.jpg', false, 1),
  (9, '/images/electronics/Wireless Gaming Mouse.jpg', true, 0),
  (9, '/images/electronics/Wireless Gaming Mouse2.jpg', false, 1),
  (10, '/images/electronics/Power Bank 20000mAh Fast Charge.jpg', true, 0),
  (10, '/images/electronics/Power Bank 20000mAh Fast Charge2.jpg', false, 1),
  (11, '/images/electronics/Smartwatch Fitness Tracker.jpg', true, 0),
  (11, '/images/electronics/Smartwatch Fitness Tracker2.jpg', false, 1),
  (12, '/images/electronics/NoiseCancelling Neckband Earphones.jpg', true, 0),
  (12, '/images/electronics/Noise Cancelling Neckband Earphones2.jpg', false, 1);

-- BOOKS (products 13-24)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (13, '/images/AtomicHabits.jpg', true, 0),
  (13, '/images/Atomic Habits by James Clear2.jpg', false, 1),
  (14, '/images/CleanCode.jpg', true, 0),
  (14, '/images/CleanCode A Handbook of Agile Software 2.jpg', false, 1),
  (15, '/images/Psychologyofmoney.jpg', true, 0),
  (15, '/images/The Psychology of Money2.jpg', false, 1),
  (16, '/images/SystemDesignInterview.jpg', true, 0),
  (16, '/images/System Design Interview Vol. 12.jpg', false, 1),
  (17, '/images/RichDadPoorDad.jpg', true, 0),
  (17, '/images/Rich Dad Poor Dad2.jpg', false, 1),
  (18, '/images/Cracking the Coding Interview.jpg', true, 0),
  (18, '/images/Cracking the Coding Interview2.jpg', false, 1),
  (19, '/images/SapiensHistoryofHumankind.jpg', true, 0),
  (19, '/images/Sapiens A Brief History of Humankind2.jpg', false, 1),
  (20, '/images/PragmaticProgrammer.jpg', true, 0),
  (20, '/images/The Pragmatic Programmer2.jpg', false, 1),
  (21, '/images/Deep Work by Cal Newpor.jpg', true, 0),
  (21, '/images/Deep Work by Cal Newport2.jpg', false, 1),
  (22, '/images/Introduction to Algorithms (CLRS).jpg', true, 0),
  (22, '/images/Introduction to Algorithms (CLRS)2.webp', false, 1),
  (23, '/images/Thinking, Fast and Slow.jpg', true, 0),
  (23, '/images/Thinking, Fast and Slow2.jpg', false, 1),
  (24, '/images/The Lean Startup.jpg', true, 0),
  (24, '/images/The Lean Startup2.webp', false, 1);

-- CLOTHING (products 25-36)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (25, '/images/Classic Fit Cotton T-Shirt.jpg', true, 0),
  (25, '/images/Classic Fit Cotton T-Shirt.jpg', false, 1),
  (26, '/images/Slim Fit Denim Jeans.jpg', true, 0),
  (26, '/images/Slim Fit Denim Jeans.jpg', false, 1),
  (27, '/images/Waterproof Winter Jacket.jpg', true, 0),
  (27, '/images/Waterproof Winter Jacket2.jpg', false, 1),
  (28, '/images/Formal Slim Fit Shirt.jpg', true, 0),
  (28, '/images/Formal Slim Fit Shirt2.jpg', false, 1),
  (29, '/images/Jogger Track Pants.jpg', true, 0),
  (29, '/images/Jogger Track Pants2.jpg', false, 1),
  (30, '/images/Hooded Pullover Sweatshirt.jpg', true, 0),
  (30, '/images/Hooded Pullover Sweatshirt2.jpg', false, 1),
  (31, '/images/Printed Casual Polo T-Shirt.jpg', true, 0),
  (31, '/images/Printed Casual Polo T-Shirt2.jpg', false, 1),
  (32, '/images/Leather Belt Genuine.jpg', true, 0),
  (32, '/images/Leather Belt Genuine2.jpg', false, 1),
  (33, '/images/Running Sneakers Breathable Mesh.jpg', true, 0),
  (33, '/images/Running Sneakers Breathable Mesh2.jpg', false, 1),
  (34, '/images/Cotton Boxer Shorts Pack of 3.jpg', true, 0),
  (34, '/images/Cotton Boxer Shorts Pack of 32.jpg', false, 1),
  (35, '/images/Aviator Sunglasses UV400.jpg', true, 0),
  (35, '/images/Aviator Sunglasses UV4002.jpg', false, 1),
  (36, '/images/Woolen Winter Cap Beanie.jpg', true, 0),
  (36, '/images/Woolen Winter Cap Beanie2.jpg', false, 1);

-- HOME & KITCHEN (products 37-48)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (37, '/images/Stainless Steel Coffee Maker 12 Cup.png', true, 0),
  (37, '/images/Stainless Steel Coffee Maker 12 Cup (2).png', false, 1),
  (38, '/images/Non-Stick Cookware Set 10 Piece.png', true, 0),
  (38, '/images/Non-Stick Cookware Set 10 Piece.png', false, 1),
  (39, '/images/Memory Foam Pillow Set of 2 (1).png', true, 0),
  (39, '/images/Memory Foam Pillow Set of 2 (2).png', false, 1),
  (40, '/images/LED Desk Lamp with USB Charging (1).png', true, 0),
  (40, '/images/LED Desk Lamp with USB Charging (2).png', false, 1),
  (41, '/images/Electric Kettle 1.8L Stainless Steel (1).png', true, 0),
  (41, '/images/Electric Kettle 1.8L Stainless Steel (2).png', false, 1),
  (42, '/images/Digital Kitchen Weighing Scale (1).png', true, 0),
  (42, '/images/Digital Kitchen Weighing Scale (2).png', false, 1),
  (43, '/images/Vacuum Insulated Water Bottle 1L (1).png', true, 0),
  (43, '/images/Vacuum Insulated Water Bottle 1L (2).png', false, 1),
  (44, '/images/Microfiber Bed Sheet Set King Size (1).png', true, 0),
  (44, '/images/Microfiber Bed Sheet Set King Size (2).png', false, 1),
  (45, '/images/Plastic Storage Container Set 12pc (1).png', true, 0),
  (45, '/images/Plastic Storage Container Set 12pc (2).png', false, 1),
  (46, '/images/Wall Clock Silent Non-Ticking 12 inch (1).png', true, 0),
  (46, '/images/Wall Clock Silent Non-Ticking 12 inch (2).png', false, 1),
  (47, '/images/Cutting Board Set Bamboo 3 Pack (1).png', true, 0),
  (47, '/images/Cutting Board Set Bamboo 3 Pack (2).png', false, 1),
  (48, '/images/French Press Coffee Maker 600ml (1).png', true, 0),
  (48, '/images/French Press Coffee Maker 600ml (2).png', false, 1);

-- SPORTS (products 49-60)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (49, '/images/Yoga Mat Premium (1).png', true, 0),
  (49, '/images/Yoga Mat Premium (2).png', false, 1),
  (50, '/images/Adjustable Dumbbell Set 2-24 kg (1).png', true, 0),
  (50, '/images/Adjustable Dumbbell Set 2-24 kg (2).png', false, 1),
  (51, '/images/Running Shoes Lightweight Mesh (1).png', true, 0),
  (51, '/images/Running Shoes Lightweight Mesh (2).png', false, 1),
  (52, '/images/Resistance Bands Set of 5 (1).png', true, 0),
  (52, '/images/Resistance Bands Set of 5 (2).png', false, 1),
  (53, '/images/Stainless Steel Water Bottle (1).png', true, 0),
  (53, '/images/Stainless Steel Water Bottle (2).png', false, 1),
  (54, '/images/Skipping Rope Adjustable Speed (1).png', true, 0),
  (54, '/images/Skipping Rope Adjustable Speed (2).png', false, 1),
  (55, '/images/Cricket Bat English Willow (1).png', true, 0),
  (55, '/images/Cricket Bat English Willow (2).png', false, 1),
  (56, '/images/Football Official Size 5 (1).png', true, 0),
  (56, '/images/Football Official Size 5 (2).png', false, 1),
  (57, '/images/gym gloves with wrist support (1).png', true, 0),
  (57, '/images/gym gloves with wrist support (2).png', false, 1),
  (58, '/images/Badminton Racket Set of 2 (1).png', true, 0),
  (58, '/images/Badminton Racket Set of 2 (2).png', false, 1),
  (59, '/images/foam roller for muscle recovery (1).png', true, 0),
  (59, '/images/foam roller for muscle recovery (2).png', false, 1),
  (60, '/images/Pull Up Bar Doorway Mount (1).png', true, 0),
  (60, '/images/Pull Up Bar Doorway Mount (2).png', false, 1);

-- TOYS (products 61-70)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  (61, '/images/Building Blocks Set 1000 Pieces (1).png', true, 0),
  (61, '/images/Building Blocks Set 1000 Pieces (2).png', false, 1),
  (62, '/images/Remote Control Racing Car High Speed (1).png', true, 0),
  (62, '/images/Remote Control Racing Car High Speed (2).png', false, 1),
  (63, '/images/Board Game Strategy Collection (1).png', true, 0),
  (63, '/images/Board Game Strategy Collection (2).png', false, 1),
  (64, '/images/Science Experiment Kit for Kids (1).png', true, 0),
  (64, '/images/Science Experiment Kit for Kids (2).png', false, 1),
  (65, '/images/Magnetic Drawing Board Large (1).png', true, 0),
  (65, '/images/Magnetic Drawing Board Large (2).png', false, 1),
  (66, '/images/Plush Teddy Bea (1).png', true, 0),
  (66, '/images/Plush Teddy Bea (2).png', false, 1),
  (67, '/images/Kids Bicycle with Training Wheels (1).png', true, 0),
  (67, '/images/Kids Bicycle with Training Wheels (2).png', false, 1),
  (68, '/images/Puzzle Set 500 Pieces World Map (1).png', true, 0),
  (68, '/images/Puzzle Set 500 Pieces World Map (2).png', false, 1),
  (69, '/images/Play-Doh Modeling Compound 12 Pac (1).png', true, 0),
  (69, '/images/Play-Doh Modeling Compound 12 Pac (2).png', false, 1),
  (70, '/images/Nerf Blaster Elite 2.0 with 20 Darts (1).png', true, 0),
  (70, '/images/Nerf Blaster Elite 2.0 with 20 Darts (2).png', false, 1);
