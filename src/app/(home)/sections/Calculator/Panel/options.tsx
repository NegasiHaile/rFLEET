import Parcel from '@assets/icons/parcel.svg'
import PolyMailer from '@assets/icons/polymailer.svg'
import currunciesData from '@json/currencies.json'

export const shippingMethods = [
  { label: 'Parcel', value: 'Parcel', locked: false },
  { label: 'LTL & Partials', value: 'LTL & Partials', locked: false },
  { label: 'Ocean Shipping', value: 'Ocean Shipping', locked: true },
  { label: 'Air Cargo', value: 'Air Cargo', locked: true },
  {
    label: 'FTL, Drayage, etc',
    value: 'FTL',
    locked: true
  }
]

export const parcelShapes = [
  {
    label: (
      <div className="flex items-center gap-d-10">
        <Parcel />
        Box or Tube
      </div>
    ),
    value: 'Box or Tube'
  },
  {
    label: (
      <div className="flex items-center gap-d-10">
        <PolyMailer />
        Poly Mailer/Satchel
      </div>
    ),
    value: 'Poly Mailer/Satchel'
  }
]

export const dimensionUnits = [
  {
    label: 'in',
    value: 'inch'
  },
  {
    label: 'cm',
    value: 'centimeter'
  }
]

export const weightUnits = [
  {
    label: 'lbs',
    value: 'pound'
  },
  {
    label: 'kgs',
    value: 'kilogram'
  }
]

export const packageUnits = [
  {
    label: 'Pieces',
    value: 'Pieces'
  }
]

export const currencies = Object.entries(currunciesData).map(([key, currency]) => ({
  label: currency.code,
  value: currency.code
}))

export const returnLabels = [
  {
    label: 'General hazmat',
    value: 'General hazmat'
  }
]

export const handlingUnits = [
  { label: 'Pallet(s)', value: 'Pallet(s)' },
  { label: 'Bag(s)', value: 'Bag(s)' },
  { label: 'Bale(s)', value: 'Bale(s)' },
  { label: 'Barrel(s)', value: 'Barrel(s)' },
  { label: 'Basket(s)', value: 'Basket(s)' },
  { label: 'Bin(s)', value: 'Bin(s)' },
  { label: 'Box', value: 'Box' },
  { label: 'Boxes', value: 'Boxes' },
  { label: 'Bucket(s)', value: 'Bucket(s)' },
  { label: 'Bunch', value: 'Bunch' },
  { label: 'Bunches', value: 'Bunches' },
  { label: 'Bundle(s)', value: 'Bundle(s)' },
  { label: 'Cabinet(s)', value: 'Cabinet(s)' },
  { label: 'Can(s)', value: 'Can(s)' },
  { label: 'Carboy(s)', value: 'Carboy(s)' },
  { label: 'Carrier(s)', value: 'Carrier(s)' },
  { label: 'Carton(s)', value: 'Carton(s)' },
  { label: 'Case(s)', value: 'Case(s)' },
  { label: 'Cask(s)', value: 'Cask(s)' },
  { label: 'Chest(s)', value: 'Chest(s)' },
  { label: 'Coil(s)', value: 'Coil(s)' },
  { label: 'Container(s)', value: 'Container(s)' },
  { label: 'Crate(s)', value: 'Crate(s)' },
  { label: 'Cylinder(s)', value: 'Cylinder(s)' },
  { label: 'Drum(s)', value: 'Drum(s)' },
  { label: 'Envelope(s)', value: 'Envelope(s)' },
  { label: 'Firkin(s)', value: 'Firkin(s)' },
  { label: 'Gaylord(s)', value: 'Gaylord(s)' },
  { label: 'Keg(s)', value: 'Keg(s)' },
  { label: 'Loose', value: 'Loose' },
  { label: 'Octabin(s)', value: 'Octabin(s)' },
  { label: 'Other', value: 'Other' },
  { label: 'Package(s)', value: 'Package(s)' },
  { label: 'Pail(s)', value: 'Pail(s)' },
  { label: 'Piece(s)', value: 'Piece(s)' },
  { label: 'Pipe Line(s)', value: 'Pipe Line(s)' },
  { label: 'Plastic Jerrican(s)', value: 'Plastic Jerrican(s)' },
  { label: 'Pounds(s)', value: 'Pounds(s)' },
  { label: 'Rack(s)', value: 'Rack(s)' },
  { label: 'Reel(s)', value: 'Reel(s)' },
  { label: 'Roll(s)', value: 'Roll(s)' },
  { label: 'Sack(s)', value: 'Sack(s)' },
  { label: 'Satchel(s)', value: 'Satchel(s)' },
  { label: 'Skid(s)', value: 'Skid(s)' },
  { label: 'Spool(s)', value: 'Spool(s)' },
  { label: 'SuperSack(s)', value: 'SuperSack(s)' },
  { label: 'Tank(s)', value: 'Tank(s)' },
  { label: 'Tire(s)', value: 'Tire(s)' },
  { label: 'Ton(s)', value: 'Ton(s)' },
  { label: 'Tote(s)', value: 'Tote(s)' },
  { label: 'Trailer(s)', value: 'Trailer(s)' },
  { label: 'Tray(s)', value: 'Tray(s)' },
  { label: 'Truckload(s)', value: 'Truckload(s)' },
  { label: 'Trunk(s)', value: 'Trunk(s)' },
  { label: 'Tube(s)', value: 'Tube(s)' },
  { label: 'Unit(s)', value: 'Unit(s)' },
  { label: 'Van Pack(s)', value: 'Van Pack(s)' },
  { label: 'Vehicle(s)', value: 'Vehicle(s)' }
]

export const incotermOptions = [
  {
    value: 'EXW - Ex Works',
    label: 'EXW - Ex Works',
    description:
      'The seller makes the goods available at their premises, and the buyer is responsible for all transportation, export, and import arrangements. \n\n Example: The seller delivers the goods to their factory gate, and the buyer is responsible for picking up the goods and handling all further transportation.'
  },
  {
    value: 'FCA - Free Carrier',
    label: 'FCA - Free Carrier',
    description:
      '(Named Place) The seller delivers the goods to the carrier or another specified location, and the buyer is responsible for the main carriage. \n\n Example: The seller hands over the goods to a carrier appointed by the buyer at the agreed location, such as a port or airport.'
  },
  {
    value: 'CPT - Carriage Paid To',
    label: 'CPT - Carriage Paid To',
    description:
      "(Named Port of Destination) The seller delivers the goods to a carrier or another specified location, and the seller pays for the transportation to the named destination. \n\n Example: The seller delivers the goods to the carrier, and the seller covers the transportation costs to the buyer's specified location."
  },
  {
    value: 'CIP - Carriage and Insurance Paid To',
    label: 'CIP - Carriage and Insurance Paid To',
    description:
      "(Named Port of Destination) Similar to CPT, but the seller also arranges and pays for insurance coverage against the buyer's risk of loss or damage during transportation. \n\n Example: The seller is responsible for delivering the goods to the carrier and ensuring they are insured during transit until they reach the buyer's destination."
  },
  {
    value: 'DAP - Delivered at Place',
    label: 'DAP - Delivered at Place',
    description:
      "(Named Port of Destination) The seller delivers the goods at the buyer's chosen location, but not cleared for import. \n\n Example: The seller delivers the goods to the buyer's warehouse or another location, but the buyer handles import clearance and pays customs duties."
  },
  {
    value: 'DPU - Delivered at Place Unloaded (formerly known as DAT)',
    label: 'DPU - Delivered at Place Unloaded (formerly known as DAT)',
    description:
      '(Named Port of Destination) Delivered at Place Unloaded (destination) the seller delivers the goods, unloaded, at a named terminal at the destination port or place of importation. \n\n Example: The seller delivers the goods to the specified terminal at the destination port, and the buyer arranges for customs clearance and further transportation.'
  },
  {
    value: 'DDP - Delivered Duty Paid',
    label: 'DDP - Delivered Duty Paid',
    description:
      "(Named Port of Destination) The seller is responsible for delivering the goods to the buyer's chosen location, cleared for import, and paying all applicable duties and taxes. \n\n Example: The seller handles all aspects, including transportation, customs clearance, and duties, delivering the goods to the buyer's doorstep."
  },
  {
    value: 'FAS - Free Alongside Ship',
    label: 'FAS - Free Alongside Ship',
    description:
      '(Named Port of Loading) The seller places the goods alongside the vessel at the named port of shipment, and the buyer is responsible for loading them onto the vessel. \n\n Example: The seller delivers the goods to the port and places them next to the ship for the buyer to load.'
  },
  {
    value: 'FOB - Free on Board',
    label: 'FOB - Free on Board',
    description:
      '(Named Port of Loading) The seller delivers the goods on board the vessel at the named port of shipment, and the risk transfers to the buyer once they are on the vessel. \n\n Example: The seller delivers the goods to the vessel, and once they are on board, the risk is transferred to the buyer.'
  },
  {
    value: 'CFR - Cost and Freight',
    label: 'CFR - Cost and Freight',
    description:
      '(Named Port of Destination) The seller delivers the goods on board the vessel at the named port of shipment, and the seller pays for the cost of transportation to the destination port. \n\n Example: The seller delivers the goods on board the vessel, and the seller covers the freight costs to the destination port.'
  },
  {
    value: 'CIF - Cost, Insurance, and Freight',
    label: 'CIF - Cost, Insurance, and Freight',
    description:
      "(Named Port of Destination) Similar to CFR, but the seller also arranges and pays for insurance coverage against the buyer's risk of loss or damage during transportation. \n\n Example: The seller delivers the goods on board the vessel and ensures they are insured during transit until they reach the destination port."
  }
]

export const weightTypes = [
  {
    label: 'Overweight',
    value: 'Overweight'
  }
]

export const containerTypes = [
  {
    value: '',
    label: 'Dry Cargo',
    groupLabel: true
  },
  {
    label: "20' Dry Standard",
    value: "20' Dry Standard"
  },
  {
    label: "20' Dry High Cube",
    value: "20' Dry High Cube"
  },
  {
    label: "40' Dry Standard",
    value: "40' Dry Standard"
  },
  {
    label: "40' Dry High Cube",
    value: "40' Dry High Cube"
  },
  {
    value: '',
    label: 'Refrigerated Cargo',
    groupLabel: true
  },
  {
    label: "20' Reefer Standard",
    value: "20' Reefer Standard"
  },
  {
    label: "20' Reefer High Cube",
    value: "20' Reefer High Cube"
  },
  {
    label: "40' Reefer Standard",
    value: "40' Reefer Standard"
  },
  {
    label: "40' Reefer High Cube",
    value: "40' Reefer High Cube"
  }
]

export const truckTypes = [
  {
    label: 'Dry Van',
    value: 'Dry Van'
  }
]

export const truckSizes = [
  {
    label: '48',
    value: '48'
  }
]

export const loadTypes = [
  {
    label: '4850 lbs (2000kg) Outof Gauge',
    value: 'Dry Van'
  }
]

export const loadSizes = [
  {
    label: '40',
    value: '40'
  }
]
