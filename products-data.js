/**
 * CACAO ARTISANAL - Products and Blog Data
 * Centralized dataset for dynamic rendering of Shop, Collections, Blog, Product Details, and Blog Details.
 */

const CACAO_DATA = {
    products: [
        {
            id: "grand-cru",
            name: "The Grand Cru Assortment",
            price: 45.00,
            category: "boxes",
            origin: "Madagascar & Ecuador Blend",
            percentage: "Mixed Cacao",
            image: "https://images.unsplash.com/photo-1571859812101-5512cab4416d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Signature Selection",
            shortDesc: "A curated library of 12 exquisite truffles including Burnt Caramel, Smoked Salt Ganache, Spiced Blood Orange, and Wild Lavender.",
            description: "Indulge in a carefully assembled selection of our finest creations. The Grand Cru Assortment brings together twelve handcrafted truffles that showcase our chocolatiers' mastery of flavor and texture. Encased in an embossed, eco-friendly cream box, it makes the perfect gift for connoisseurs of fine desserts.",
            specs: ["12 Handcrafted Pieces", "Organic Single-Origin Blend", "Gluten-Free", "No Artificial Preservatives"],
            details: "Contains soy and tree nuts (hazelnuts, almonds). May contain traces of dairy in white chocolate fillings. Store in a cool, dry place between 16-18°C (60-64°F).",
            tastingProfile: { sweetness: 3, intensity: 4, fruitiness: 4, woodiness: 3 },
            variants: ["12 Pieces - $45.00", "24 Pieces - $85.00", "6 Pieces (Mini Box) - $24.00"]
        },
        {
            id: "burnt-caramel",
            name: "Burnt Caramel Truffle",
            price: 3.50,
            category: "truffles",
            origin: "Ecuador",
            percentage: "70% Cacao Shell",
            image: "https://plus.unsplash.com/premium_photo-1677678736767-7641af9cb43c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Bestseller",
            shortDesc: "Liquid amber caramel infused with organic French sea salt, enveloped in a micro-thin 70% dark shell.",
            description: "A masterclass in contrast. The bitter richness of our single-origin Ecuadorian dark chocolate shell gives way to a smooth, flowing amber core of salted caramel. Slowly cooked to a precise deep caramelization and finished with hand-harvested Fleur de Sel from Guérande.",
            specs: ["Single Piece", "French Fleur de Sel", "Liquid Amber Core", "Hand-tempered"],
            details: "Contains dairy. Manufactured in a facility that processes nuts. Best consumed within 14 days of purchase.",
            tastingProfile: { sweetness: 4, intensity: 3, fruitiness: 2, woodiness: 2 },
            variants: ["Single Truffle - $3.50", "Box of 6 - $20.00", "Box of 12 - $38.00"]
        },
        {
            id: "wild-lavender",
            name: "Wild Lavender Ganache",
            price: 3.75,
            category: "truffles",
            origin: "Madagascar",
            percentage: "White Cocoa Butter",
            image: "https://images.unsplash.com/photo-1523035274455-b2e5c6d5c2e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Botanical",
            shortDesc: "Infused with locally sourced lavender buds and whipped Madagascar white chocolate ganache.",
            description: "Delicate, floral, and extraordinarily creamy. We steep organic wild lavender buds in warm cream before whipping it into our velvety, house-pressed Madagascar white chocolate ganache. Rolled in a dusting of dried botanicals for a subtle textured finish.",
            specs: ["Single Piece", "Infused Lavender Buds", "Whipped Ganache Center", "Preservative-free"],
            details: "Contains dairy and lavender. Suitable for vegetarians.",
            tastingProfile: { sweetness: 5, intensity: 2, fruitiness: 3, floral: 5 },
            variants: ["Single Truffle - $3.75", "Box of 6 - $22.00", "Box of 12 - $40.00"]
        },
        {
            id: "blood-orange",
            name: "Blood Orange Praline",
            price: 3.50,
            category: "truffles",
            origin: "Peru",
            percentage: "65% Cacao Shell",
            image: "https://plus.unsplash.com/premium_photo-1673138930194-7c0450505a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Award Winner",
            shortDesc: "Zesty Sicilian blood orange reduction blended with roasted hazelnut praline cream.",
            description: "An vibrant citrus explosion balanced by roasted nuttiness. A reduction of organic Sicilian blood orange juice is layered over a creamy, stone-ground hazelnut praline inside a thin shell of Peruvian single-origin chocolate. A gold medal winner at the Gourmet Dessert Awards.",
            specs: ["Single Piece", "Sicilian Blood Orange", "Roasted Hazelnut Praline", "Award Winner"],
            details: "Contains tree nuts (hazelnuts) and dairy. Gluten-free.",
            tastingProfile: { sweetness: 3, intensity: 3, fruitiness: 5, nuttiness: 4 },
            variants: ["Single Truffle - $3.50", "Box of 6 - $20.00", "Box of 12 - $38.00"]
        },
        {
            id: "espresso-bar",
            name: "Blood Orange & Cracked Espresso Bar",
            price: 12.00,
            category: "bars",
            origin: "Madagascar",
            percentage: "72% Cacao",
            image: "https://images.unsplash.com/photo-1635491201370-1abd16f0cde0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Editorial Pick",
            shortDesc: "Zesty, bright citrus notes blending into warm roasted coffee undertones, harvested from organic Madagascar farms.",
            description: "Our signature dark chocolate bar is crafted from rare Trinitario beans sourced from the Sambirano Valley. We infuse the chocolate with dried organic blood orange peel and fold in cracked, single-estate Geisha espresso beans, creating a delightful crunchy texture and citrus-roast harmony.",
            specs: ["80g Bar", "Single-Origin Madagascar Cacao", "Fair-Trade Sourced", "Vegan & Dairy-Free"],
            details: "Vegan. Gluten-free. May contain traces of tree nuts and soy.",
            tastingProfile: { sweetness: 2, intensity: 5, fruitiness: 4, acidity: 4 },
            variants: ["80g Single Bar - $12.00", "3-Bar Library Box - $32.00"]
        },
        {
            id: "almond-bar",
            name: "Smoked Sea Salt & Roasted Almond Bar",
            price: 11.50,
            category: "bars",
            origin: "Ecuador",
            percentage: "85% Cacao",
            image: "https://images.unsplash.com/photo-1613669146965-507d0e72a688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Classic",
            shortDesc: "Robust dark chocolate with wood-smoked fleur de sel and double-roasted organic almond slivers.",
            description: "For lovers of high-percentage dark chocolate. We use deep, earthy Nacional beans from Ecuador, conched for 72 hours to soften bitterness. We then accent it with organic almonds roasted twice for maximum crunch, and a light sprinkling of wood-smoked sea salt.",
            specs: ["80g Bar", "85% Ecuadorian Nacional Cocoa", "Hand-harvested Smoked Salt", "Vegan & Gluten-Free"],
            details: "Contains tree nuts (almonds). Gluten-free. Dairy-free.",
            tastingProfile: { sweetness: 1, intensity: 5, woodiness: 4, saltiness: 2 },
            variants: ["80g Single Bar - $11.50", "3-Bar Library Box - $30.00"]
        },
        {
            id: "rosemary-bar",
            name: "Wild Rosemary & Burnt Honey Bar",
            price: 13.00,
            category: "bars",
            origin: "Peru",
            percentage: "68% Cacao",
            image: "https://images.unsplash.com/photo-1643094264639-955fdb53cfc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Micro-Batch",
            shortDesc: "An experimental micro-batch bar. Herbaceous wild rosemary notes sweetened with caramelized honey.",
            description: "A boundary-pushing flavor profile. Hand-foraged wild rosemary from local organic gardens is infused into our Peruvian Criollo chocolate. We swirl in thin threads of dehydrated burnt wildflower honey to provide bursts of deep caramel sweetness that contrast with the herbal pine notes.",
            specs: ["75g Bar", "Micro-Batch (Limited Release)", "Hand-foraged Botanicals", "Burnt Honey Swirl"],
            details: "Contains honey (not strictly vegan). Gluten-free. Dairy-free.",
            tastingProfile: { sweetness: 3, intensity: 4, herbal: 5, woodiness: 3 },
            variants: ["75g Single Bar - $13.00", "Limited Edition Twin Pack - $24.00"]
        },
        {
            id: "pairing-box",
            name: "The Caramel & Dark Cacao Pairing Box",
            price: 38.00,
            category: "boxes",
            origin: "Ecuador & Peru Blend",
            percentage: "Curated Percentages",
            image: "https://images.unsplash.com/photo-1582570675095-9b679953577e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            badge: "Sensory Flight",
            shortDesc: "A curated box of 8 truffles and 2 chocolate bars, specifically designed for whiskey or coffee pairing sessions.",
            description: "Curated by Head Chocolatier Anelia Vance, this collection is designed to take you on a sensory pairing journey. Includes 4 Burnt Caramel Truffles, 4 Spiced Blood Orange Truffles, 1 Smoked Sea Salt Dark Bar, and 1 Peruvian Wild Honey Bar. Includes our detailed pairing guide brochure.",
            specs: ["8 Truffles + 2 Bars", "Includes Pairing Guide Brochure", "Eco-friendly Cream Embossed Case", "Tasting Note Cards"],
            details: "Contains tree nuts, honey, and dairy. Store in a dry place.",
            tastingProfile: { sweetness: 3, intensity: 4, fruitiness: 3, complexity: 5 },
            variants: ["Standard Pairing Box - $38.00", "Deluxe Box with Coffee/Tea Sampler - $55.00"]
        },
        {
            id: "tasting-flight",
            name: "Single-Origin Tasting Flight",
            price: 25.00,
            category: "boxes",
            origin: "Multi-Origin (Ecuador, Peru, Madagascar)",
            percentage: "Various (65% to 88%)",
            image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
            badge: "Gift Idea",
            shortDesc: "Six mini-bars from 6 different cocoa-producing micro-lots, demonstrating the impact of soil and fermentation.",
            description: "The ultimate educational tasting experience. Learn to identify the distinct flavor profiles of different origins. From the red fruit and citrus notes of Madagascar Trinitario, to the floral and banana undertones of Ecuadorian Nacional, to the earthy, spicy tones of Peruvian Criollo. Contains six 20g bars.",
            specs: ["6 x 20g Mini Bars", "Origin Profile Tasting Wheel", "Ecuador, Peru, Madagascar, Madagascar White", "100% Organic Cacao"],
            details: "Vegan. Gluten-free. Preservative-free. May contain traces of tree nuts.",
            tastingProfile: { sweetness: 2, intensity: 4, acidity: 3, variety: 5 },
            variants: ["6-Bar Flight Box - $25.00", "Double Flight (2 Sets) - $45.00"]
        },
        {
            id: "whiskey-box",
            name: "Whiskey Infused Truffle Collection",
            price: 42.00,
            category: "boxes",
            origin: "Ecuador Nacional Cacao",
            percentage: "75% Ganache",
            image: "https://images.unsplash.com/photo-1608655298071-8da02eb7819c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            badge: "Limited Release",
            shortDesc: "12 luxury truffles filled with single-malt peated whiskey ganache, rolled in dark cocoa dust.",
            description: "A rich, smoky indulgence. We blend aged, heavily-peated single-malt whiskey from Islay directly into a velvety dark chocolate ganache made from 75% Ecuadorian Nacional beans. Each truffle is finished with a micro-thin shell and rolled in premium Dutch-processed dark cocoa powder.",
            specs: ["12 Infused Truffles", "Contains Real Alcohol", "Peated Single Malt Whiskey", "Luxury Textured Gift Box"],
            details: "Contains alcohol and dairy. Must be 21+ to purchase. Not suitable for children.",
            tastingProfile: { sweetness: 2, intensity: 5, smokiness: 5, woodiness: 4 },
            variants: ["12-Piece Box - $42.00", "24-Piece Box - $78.00"]
        },
        {
            id: "vanilla-white",
            name: "Vanilla Bean & White Cocoa Butter Bar",
            price: 11.00,
            category: "bars",
            origin: "Madagascar",
            percentage: "38% Cocoa Butter",
            image: "https://plus.unsplash.com/premium_photo-1673138254120-d55ad6e5e2ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            badge: "Sweet Delicate",
            shortDesc: "Organic white chocolate bar with premium vanilla flecks and pure pressed cocoa butter.",
            description: "Rethink white chocolate. Our bar is crafted using 100% pure, un-deodorized organic cocoa butter from Madagascar, giving it a rich, natural cocoa aroma. We sweeten it with organic cane sugar and fold in scraped seeds of premium Bourbon vanilla beans.",
            specs: ["80g Bar", "38% Pure Cocoa Butter", "Bourbon Vanilla Seeds", "No Palm Oil or Fillers"],
            details: "Contains dairy. Gluten-free. Preservative-free.",
            tastingProfile: { sweetness: 5, intensity: 1, creaminess: 5, vanilla: 5 },
            variants: ["80g Single Bar - $11.00", "3-Bar Library Box - $28.00"]
        },
        {
            id: "drinking-cacao",
            name: "Signature Velvet Drinking Cacao",
            price: 18.00,
            category: "bars",
            origin: "Ecuador & Peru Blend",
            percentage: "100% Organic Cacao",
            image: "https://images.unsplash.com/photo-1483125796430-526962b9830b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            badge: "Salon Staple",
            shortDesc: "100% organic heirloom stone-ground cocoa powder and shaved dark chocolate for drinking.",
            description: "Bring the Cacao Artisanal salon experience home. This drinking chocolate is a luxurious blend of stone-ground 100% dark chocolate shavings and premium high-fat cocoa powder. Whisk with hot organic milk or oat milk to create a thick, velvety beverage with notes of warm spices and dark honey.",
            specs: ["250g Tin", "100% Pure Shaved Cacao", "Zero Sugar Added", "Traditional Stone-Ground"],
            details: "Vegan. Gluten-free. Sugar-free. Net wt. 250g (approx. 12 servings).",
            tastingProfile: { sweetness: 0, intensity: 5, bitterness: 4, body: 5 },
            variants: ["250g Tin - $18.00", "Drinking Chocolate & Whisk Set - $32.00"]
        }
    ],

    blogPosts: [
        {
            id: "tempering",
            title: "The Art of Cacao Tempering: Snap & Gloss",
            category: "Craft",
            date: "May 12, 2026",
            readTime: "6 min read",
            image: "https://plus.unsplash.com/premium_photo-1667031519192-ba1ed681751d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Tempering is the heartbeat of chocolate making. Discover the science behind achieving the perfect gloss, clean snap, and smooth melt.",
            author: "Anelia Vance",
            authorRole: "Head Chocolatier",
            content: `
                <p class="article-lead">If cocoa conching is the soul of chocolate, tempering is its structure. Without tempering, chocolate is dull, crumbly, and lacks that satisfying "snap" when broken. Today, we peel back the science of the tempering slab and explain how we mold our signature artisanal collections.</p>
                
                <h3>The Crystal Symphony</h3>
                <p>Cocoa butter is a polymorphic fat, meaning it can solidify into six different crystal structures (Forms I through VI). Each form has a unique melting point and stability. As chocolatiers, our goal is to achieve <strong>Form V (Beta crystals)</strong>. Form V gives chocolate its glossy sheen, clean snap, and a melting point of exactly 34°C (93°F)—just below human body temperature. This is what allows chocolate to stay solid in your hands, yet melt instantly and luxuriously on your tongue.</p>
                
                <blockquote>"Chocolate is the only food that is solid at room temperature, yet melts perfectly at body temperature. It is a thermodynamic miracle."</blockquote>
                
                <h3>The Temperature Curve</h3>
                <p>To cultivate Form V crystals, we must take the chocolate through a precise temperature cycle. The process requires three distinct phases:</p>
                <div class="process-steps">
                    <div class="p-step">
                        <strong>1. Melting:</strong> We heat the dark chocolate to 50°C (122°F) to break down all existing crystal networks. The chocolate becomes completely fluid.
                    </div>
                    <div class="p-step">
                        <strong>2. Cooling (Seeding):</strong> We pour two-thirds of the melted chocolate onto a cold, polished cream marble slab. Working it back and forth with palette knives, we cool it rapidly to 27°C (80°F), which stimulates crystal formation.
                    </div>
                    <div class="p-step">
                        <strong>3. Reheating:</strong> We mix it back into the remaining warm chocolate, raising the temperature to 31°C (88°F) for dark chocolate. This melts away the unstable crystals (Forms I through IV) while preserving the stable Form V beta crystals.
                    </div>
                </div>

                <h3>Why Slab Tempering Matters</h3>
                <p>While industrial manufacturers use automated tempering machines, Cacao Artisanal still tempers every small batch by hand on a cold marble slab. The contact with the natural stone allows our chocolatiers to gauge the viscosity and flow by touch. It requires years of experience to feel the exact moment when the chocolate starts to "thick" and is ready to pour into the molds. This tactile relationship with the cacao is what makes our chocolate handcrafted art, rather than a commodity.</p>
            `
        },
        {
            id: "sourcing-ecuador",
            title: "Sourcing Heirloom Criollo in Ecuador",
            category: "Sourcing",
            date: "April 28, 2026",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1545396635-f4865ca1448b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Journey with us to the high-altitude micro-lots of the Andes, where the ancient Nacional and Criollo cocoa trees yield delicate floral aromas.",
            author: "Marcus Sterling",
            authorRole: "Cocoa Sourcer",
            content: `
                <p class="article-lead">Deep in the Guayas province of Ecuador, surrounded by tropical banana groves and misty hills, lies the Camino Verde micro-lot estate. This is where we source the single-origin Nacional beans that form the foundation of our bestselling bars.</p>
                
                <h3>The Legend of Arriba Nacional</h3>
                <p>For centuries, Ecuadorian cocoa has been famous for its unique floral and herbal aroma, known as "Arriba." Genetic research shows that these heirloom trees belong to the Nacional variety, a direct descendant of the oldest cultivated cocoa trees in the Amazon basin. Unlike modern high-yield hybrid varieties like CCN-51 (which is bitter and acidic), Nacional produces thin, pale beans with a delicate complexity of jasmine, green banana, and wood-smoke.</p>
                
                <blockquote>"To stand in a grove of ancient Nacional trees is to stand in a library of taste history. You can smell the floral heritage in the soil."</blockquote>
                
                <h3>Direct Trade and Organic Custodianship</h3>
                <p>We work directly with Vicente Norero, the master fermenter of Camino Verde. Rather than buying beans from bulk brokers, we pay a premium of 45% above fair-trade prices directly to the farmers. This ensures that the families who manage the soil can afford to use organic, biodynamic methods. Fermentation is the most critical step in chocolate sourcing; Vicente uses proprietary yeast strains and precise box-turning schedules to bring out the delicate floral notes before the beans are sun-dried on elevated wooden beds.</p>
                
                <h3>Tasting the Soil</h3>
                <p>When you taste our <em>Smoked Sea Salt & Roasted Almond Bar</em>, you are tasting the unique microclimate of Ecuador. The mineral-rich soil, the coastal winds, and the slow sun-drying process leave their signatures in the cacao. We roast these beans at a lower temperature for a longer period to preserve the volatile jasmine aromas, ensuring that the final bar is an authentic, unadulterated portrait of its Ecuadorian home.</p>
            `
        },
        {
            id: "whiskey-pairing",
            title: "Gourmet Chocolate & Whiskey Pairing Guide",
            category: "Recipes",
            date: "April 15, 2026",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1586195830864-e4d9688815c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "A sensory masterclass in smoke, peat, and sweetness. Learn how to combine aged single-malts with our liquid-gold caramel cores.",
            author: "Anelia Vance",
            authorRole: "Head Chocolatier",
            content: `
                <p class="article-lead">Pairing chocolate with wine is classic, but pairing chocolate with premium spirits is where true taste synthesis occurs. The high proof of spirits cuts through cocoa butter, unlocking hidden volatile aromas that wine simply cannot reach. Today, we explore the science of pairing aged whiskey with cacao.</p>
                
                <h3>The Physics of the Palette</h3>
                <p>Chocolate is rich in cocoa fats. When you eat it, the cocoa butter coats your taste buds. While pleasant, this coating can dull your senses to subsequent flavors. The ethanol in whiskey acts as a natural solvent, gently dissolving the fat layer and preparing your taste buds for a new wave of flavor. Meanwhile, the complex wood lactones and peat compounds in the whiskey bind with the roasted cocoa pyrazines, creating brand new taste profiles on your palate.</p>
                
                <h3>Three Classic Pairings to Try</h3>
                <table class="pairing-table">
                    <thead>
                        <tr>
                            <th>Chocolate Style</th>
                            <th>Whiskey Type</th>
                            <th>Sensory Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Burnt Caramel Truffle</strong></td>
                            <td>Peated Islay Single Malt (e.g., Laphroaig)</td>
                            <td>The sweet, buttery amber of the caramel softens the medicinal peat smoke, turning it into a rich, campfire-toasted marshmallow note.</td>
                        </tr>
                        <tr>
                            <td><strong>Ecuador 85% Dark Bar</strong></td>
                            <td>Sherry Cask Bourbon (e.g., Woodford Reserve)</td>
                            <td>The high oak tannins and vanilla sweet notes of the bourbon balance the robust, earthy cocoa bitterness, highlighting dried cherry flavors.</td>
                        </tr>
                        <tr>
                            <td><strong>White Lavender Ganache</strong></td>
                            <td>Light Irish Whiskey (e.g., Jameson Black Barrel)</td>
                            <td>The creamy, sweet vanilla of the white cocoa butter acts as a base for the floral lavender and the bright pear/apple notes of the triple-distilled whiskey.</td>
                        </tr>
                    </tbody>
                </table>

                <h3>How to Host a Tasting Session</h3>
                <p>To experience these pairings fully, follow the <strong>"Bite-Sip-Bite"</strong> method. First, take a small bite of the chocolate, letting it melt slowly on your tongue. Notice the initial notes. Next, take a tiny sip of the whiskey, breathing in as you swallow. Let the alcohol cut through the chocolate. Finally, take a second bite of the chocolate. You will immediately notice tasting notes—like red fruits, smoke, or toasted bread—that were invisible during the first bite.</p>
            `
        },
        {
            id: "tart-recipe",
            title: "Velvet Cacao & Salted Caramel Tart Recipe",
            category: "Recipes",
            date: "March 30, 2026",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1728310335347-082140001938?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Recreate our boutique signature pastry in your own kitchen. An elegant guide to cocoa pastry shells, citrus caramel, and glossy ganache.",
            author: "Anelia Vance",
            authorRole: "Head Chocolatier",
            recipeDetails: {
                prepTime: "45 mins",
                cookTime: "25 mins",
                yields: "8 servings",
                difficulty: "Intermediate"
            },
            content: `
                <p class="article-lead">For years, the Velvet Cacao & Salted Caramel Tart has been the centerpiece of our physical boutique salon. Now, for the first time, we are sharing the complete recipe. Follow these steps to create an elegant, pastry-shop worthy dessert at home.</p>
                
                <div class="recipe-meta-grid">
                    <div class="rm-item"><strong>Prep:</strong> 45 Mins</div>
                    <div class="rm-item"><strong>Cook:</strong> 25 Mins</div>
                    <div class="rm-item"><strong>Yield:</strong> 1 Tart (8 Servings)</div>
                    <div class="rm-item"><strong>Difficulty:</strong> Intermediate</div>
                </div>

                <h3>Ingredients List</h3>
                <div class="recipe-ingredients-block">
                    <div class="ing-col">
                        <h4>For the Pastry Shell (Pâté Sablée):</h4>
                        <ul>
                            <li>120g Unsalted grass-fed butter (softened)</li>
                            <li>75g Icing sugar</li>
                            <li>25g Ground almonds</li>
                            <li>1 Organic egg (room temp)</li>
                            <li>200g Plain flour</li>
                            <li>30g Premium cocoa powder</li>
                            <li>A pinch of fine sea salt</li>
                        </ul>
                    </div>
                    <div class="ing-col">
                        <h4>For the Orange Caramel Layer:</h4>
                        <ul>
                            <li>150g White granulated sugar</li>
                            <li>100ml Heavy double cream</li>
                            <li>30g Unsalted butter</li>
                            <li>Zest of 1/2 organic orange</li>
                            <li>1/2 tsp Maldon sea salt flakes</li>
                        </ul>
                        <h4 style="margin-top: 15px;">For the Glossy Ganache:</h4>
                        <ul>
                            <li>150g Cacao Artisanal Madagascar 72% Chocolate (chopped)</li>
                            <li>120ml Heavy double cream</li>
                            <li>15g Softened butter</li>
                        </ul>
                    </div>
                </div>

                <h3>Preparation Steps</h3>
                <div class="recipe-instruction-steps">
                    <div class="recipe-step-card">
                        <span class="step-num">Step 1</span>
                        <h4>The Cocoa Pastry Shell</h4>
                        <p>In a medium bowl, cream the softened butter and icing sugar together until smooth. Stir in the ground almonds and egg. Sift in the flour, cocoa powder, and salt. Fold gently until a dough forms. Wrap in clingfilm and chill in the fridge for 1 hour. Once chilled, roll out to 3mm thickness and line an 8-inch tart ring. Prick the base with a fork, line with baking paper and baking beans, and bake blind at 170°C (340°F) for 15 minutes. Remove paper and beans, and bake for a further 5 minutes until crisp. Set aside to cool completely.</p>
                    </div>
                    <div class="recipe-step-card">
                        <span class="step-num">Step 2</span>
                        <h4>The Orange Caramel Layer</h4>
                        <p>Place the granulated sugar in a clean, heavy saucepan over medium heat. Let it melt slowly without stirring (you can swirl the pan occasionally) until it turns a deep amber color. Immediately remove from heat and slowly pour in the heavy cream while whisking vigorously (be careful, it will steam and bubble). Once incorporated, whisk in the butter, orange zest, and sea salt. Pour the caramel directly into the cooled tart shell, spreading it in an even layer. Place the tart in the refrigerator for 30 minutes to set.</p>
                    </div>
                    <div class="recipe-step-card">
                        <span class="step-num">Step 3</span>
                        <h4>The Glossy Ganache Glaze</h4>
                        <p>Place the finely chopped Madagascar 72% chocolate in a heatproof bowl. In a small saucepan, heat the double cream until it just starts to simmer. Pour the hot cream over the chocolate. Let it sit untouched for 2 minutes, allowing the chocolate to melt. Using a rubber spatula, stir slowly in concentric circles from the center outwards until a glossy, smooth ganache forms. Stir in the 15g of softened butter until melted. Pour the ganache over the set caramel layer. Spread it gently with a palette knife. Chill the tart for 2 hours before slicing. Top with extra Maldon salt flakes and orange curls before serving.</p>
                    </div>
                </div>
            `
        },
        {
            id: "tree-to-bar",
            title: "The Cocoa Bean Journey: Tree to Bar",
            category: "Sourcing",
            date: "March 14, 2026",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1702743692629-b11e94c63b0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Understanding the slow-craft process: from harvesting the vibrant yellow pods to the 72-hour stone-grinding process that refines our chocolate.",
            author: "Marcus Sterling",
            authorRole: "Cocoa Sourcer",
            content: `
                <p class="article-lead">We believe that chocolate is not a manufactured sweet, but an agricultural crop. The final taste of a single-origin bar is determined long before it reaches our boutique kitchen. Let's trace the slow, organic journey of the cocoa bean from farm to bar.</p>
                
                <h3>Phase 1: The Harvest & Fermentation</h3>
                <p>The journey begins on the trunk of the <em>Theobroma Cacao</em> tree, where football-shaped pods grow in shades of yellow, purple, and red. Farmers harvest the ripe pods by hand, slicing them open to reveal beans wrapped in a sweet, white mucilage. The beans are scooped into wooden boxes and covered with banana leaves. Over 5 to 7 days, natural yeasts consume the sugars in the pulp, raising temperatures to 50°C. This fermentation process is where the bean's bitter chemical compounds transform into complex chocolate flavor precursors.</p>
                
                <h3>Phase 2: Sun Drying & Roasting</h3>
                <p>After fermentation, the beans are wet and soft. We dry them under the natural sun on wooden drying patios, turning them regularly for a week until moisture levels drop to 7%. Once they arrive at our kitchen, we roast them in small batches. Sourcing different origins means we must create unique roasting profiles: Madagascar beans are roasted quickly and lightly to preserve fruit acidity, while Ecuadorian beans are roasted low and slow to highlight floral and wood notes.</p>
                
                <blockquote>"Roasting is the signature of the chocolatier. It is where we choose which natural voices of the bean to amplify and which to soften."</blockquote>
                
                <h3>Phase 3: Winnowing & 72-Hour Conching</h3>
                <p>The roasted beans are cracked and run through a winnower, which blows away the thin, paper-like husks, leaving behind pure cocoa nibs. We put the nibs into traditional stone-roller melangers. For 72 hours, the heavy granite rollers grind the nibs down to a particle size of under 18 microns—so small that the human tongue cannot detect any grittiness. During this conching phase, bitter volatile acids escape, cocoa butter is fully distributed, and we add organic cane sugar to achieve the final percentage. The chocolate is now ready to be tempered and poured into bars.</p>
            `
        },
        {
            id: "praline-masterclass",
            title: "Praline Perfection: The Parisian Technique",
            category: "Craft",
            date: "February 25, 2026",
            readTime: "7 min read",
            image: "/https://images.unsplash.com/photo-1601876819169-9ddf6f214a47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI5fHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Discover the classical French approach to crafting perfectly amber pralines with caramelised hazelnuts and a shattering crisp finish.",
            author: "Anelia Vance",
            authorRole: "Head Chocolatier",
            content: `<p class="article-lead">Praline is the foundation of French confectionery. Mastering it unlocks an entire world of nutty, caramelised chocolate fillings and crunchy bonbon centres.</p><h3>The Caramelisation Window</h3><p>The secret lies in the temperature window between 155°C and 180°C — the Maillard reaction zone where sugars transform from pale gold to deep amber. Going beyond this creates bitterness; falling short leaves a raw sweetness without depth.</p><blockquote>"A true praline should shatter in your teeth with a clean crack before flooding your tongue with roasted nuttiness."</blockquote><h3>Technique Steps</h3><p>We dry-caramelise white caster sugar in a heavy copper pan, watching its colour transition. Once amber, we fold in warm roasted hazelnuts and pour the mass onto a lightly oiled marble slab. After cooling completely, we grind the brittle into a smooth, oily paste using a high-speed stone melanger. This paste becomes the heart of our Praline Dôme truffle.</p>`
        },
        {
            id: "ganache-science",
            title: "Chef's Notes: Ganache Ratios & Emulsification",
            category: "Recipes",
            date: "February 10, 2026",
            readTime: "6 min read",
            image: "https://plus.unsplash.com/premium_photo-1673138930008-64cdecb37a95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "A deep dive into the science of perfect ganache — fat ratios, cream temperatures, and the emulsification secrets behind our silkiest fillings.",
            author: "Anelia Vance",
            authorRole: "Head Chocolatier",
            content: `<p class="article-lead">Ganache is, at its core, an emulsion: fat suspended in water. Get the balance wrong and it splits. Get it right and you achieve a glossy, velvet-smooth filling that melts to cream on the tongue.</p><h3>The Golden Ratio</h3><p>For a firm truffle centre: 2 parts chocolate to 1 part cream by weight. For a pourable glaze: 1:1 ratio. For a soft, spoonable ganache: 1 part chocolate to 1.5 parts cream. We always use cream heated to exactly 85°C — hot enough to melt chocolate but not so hot it scorches the cocoa fats.</p><h3>The Emulsification Method</h3><p>Pour hot cream over finely chopped chocolate in three stages, stirring in tight concentric circles from the centre outward. This technique builds the emulsion slowly and prevents the mixture from seizing. Finally, blend with an immersion blender to achieve a flawlessly smooth, glossy finish.</p>`
        },
        {
            id: "ghana-origin",
            title: "Ghana's Golden Belt: A Sourcing Journal",
            category: "Sourcing",
            date: "January 20, 2026",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1573013778470-26b347398a94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM0fHxjaG9jb2xhdGV8ZW58MHx8MHx8fDA%3D",
            excerpt: "Travel with our cocoa sourcer through the Ashanti Region's cooperative farms and discover the bold, fudgy character of Ghanaian Forastero cacao.",
            author: "Marcus Sterling",
            authorRole: "Cocoa Sourcer",
            content: `<p class="article-lead">Ghana's Ashanti Region produces some of the world's most consistent and full-bodied cocoa. The Forastero variety grown here has a robust, earthy depth that forms the backbone of many of our darkest single-origin bars.</p><h3>The Kuapa Kokoo Cooperative</h3><p>We source exclusively from the Kuapa Kokoo cooperative — a 100,000-farmer organisation that pioneered fair-trade certification in Ghana. Every bag of beans we receive comes with GPS traceability, organic certification, and detailed fermentation logs. Our premium helps fund healthcare clinics and school scholarships in the farming villages.</p><blockquote>"Ghanaian cacao carries the richness of red volcanic soil and equatorial sun. It is the loudest, most confident cacao on the palate."</blockquote><h3>Flavour Profile</h3><p>Expect deep fudge, ripe banana, and brown butter notes with a bold tannin structure. We roast these beans at 140°C for a medium-length cycle to preserve the earthy complexity while smoothing the tannins into a velvety chocolate experience.</p>`
        }
    ]
};
