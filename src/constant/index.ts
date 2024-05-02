import gateWayOfIndia from "../../public/gatewayOfIndia.svg";
import indiaGate from "../../public/indiaGate.svg";
import openHand from "../../public/openHand.svg";
import vidhanaSoudha from "../../public/vidhanaSoudha.svg";
import charminar from "../../public/charminar.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import charMinarImage from "../../public/charminar.jpg";
import amberfort from "../../public/abmerfort.jpg";
import imambara from "../../public/imambara.jpeg";
import redFort from "../../public/redFort.jpeg";
import statueOfUnity from "../../public/statueOfUnity.jpg";
import lotusTemple from "../../public/lotusTemple.jpg";
import tajMahal from "../../public/tajMahal.avif";

export const popularCities = [
  {
    id: 1,
    image: gateWayOfIndia as StaticImport,
    name: "Mumbai",
    link: "/city/mumbai",
  },
  {
    id: 2,
    image: indiaGate as StaticImport,
    name: "Delhi",
    link: "/city/delhi",
  },
  {
    id: 3,
    image: openHand as StaticImport,
    name: "Chandigarh",
    link: "/city/chandigarh",
  },
  {
    id: 4,
    image: vidhanaSoudha as StaticImport,
    name: "Bengaluru",
    link: "/city/bengaluru",
  },
  {
    id: 5,
    image: charminar as StaticImport,
    name: "Hyderbad",
    link: "/city/hyderabad",
  },
];

export const exploreCities = [
  {
    id: 1,
    image: charMinarImage as StaticImport,
    name: "Hyderabad",
    link: "/city/hyderabad",
  },
  {
    id: 2,
    image: imambara as StaticImport,
    name: "Lucknow",
    link: "/city/lucknow",
  },
  {
    id: 3,
    image: redFort as StaticImport,
    name: "Delhi",
    link: "/city/delhi",
  },
  {
    id: 4,
    image: statueOfUnity as StaticImport,
    name: "Gujarat",
    link: "/city/gujrat",
  },
  {
    id: 5,
    image: tajMahal as StaticImport,
    name: "Agra",
    link: "/city/agra",
  },
  {
    id: 6,
    image: amberfort as StaticImport,
    name: "Jaipur",
    link: "/city/jaipur",
  },
  {
    id: 7,
    image: lotusTemple as StaticImport,
    name: "New Delhi",
    link: "/city/delhi",
  },
];

export const popularMonuments = [
  {
    name: "lucknow",
    monuments: [
      {
        id: 1,
        image: imambara as StaticImport,
        name: "Imambara",
        link: "/monument/imambara",
      },
    ],
  },
];

export const monuments = [
  {
    name: "imambara",
    image: imambara as StaticImport,
    description:
      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate iste repellendus voluptatum nisi ut atque illo omnis vel nemo tempore natus nostrum temporibus, corporis facilis expedita similique beatae ipsa assumenda iure est excepturi. Necessitatibus quidem deleniti tenetur magni debitis minima eveniet soluta dignissimos, praesentium, illo cum mollitia rem odio alias id distinctio accusantium fugiat exercitationem eius laudantium veniam impedit unde recusandae iure. Voluptate hic nulla sequi perferendis deleniti sit rerum ducimus molestias ratione esse qui laborum blanditiis incidunt fugiat accusamus, eaque obcaecati nemo. Eaque quod inventore aperiam id ab vitae magnam amet animi sunt fugit modi ipsam tenetur dolorem, assumenda ea fuga corrupti reprehenderit quae est a! Ipsum sapiente laudantium nihil, ipsa ducimus illum eius recusandae omnis! Et, praesentium eum voluptas quae qui modi fugit dolorum eaque eveniet natus, eos sint porro quidem nobis architecto, pariatur dignissimos earum? Quisquam consequuntur fugiat optio assumenda reiciendis doloribus, atque illo, rem unde iste excepturi facilis eaque ut officiis totam dolorem dolore ipsa sapiente amet laudantium. Autem ea vero enim quis facere ipsam dignissimos. Nisi, ea assumenda aperiam eaque qui nobis adipisci maiores ducimus libero molestias! Voluptatibus, ipsum. Vero magni autem laborum, illo in numquam ut, sit non sed sunt quidem, optio ex? Mollitia.",
    openingTiming: "9:00AM",
    closingTiming: "6:00PM",
    daysOpened: "Mon-fri",
    price: {
      adults: "100",
      children: "50",
    },
    location: "Lucknow, Uttar Pradest",
    contact: "+91 8989011317",
  },
];
