import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0'
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        },
        schemas: {
          CreateUserRequest: {
            type: 'object',
            properties: {
              username: {
                type: 'string'
              },
              email: {
                type: 'string'
              },
              password: {
                type: 'string',
                minLength: 8
              },
              firstName: {
                type: 'string'
              },
              lastName: {
                type: 'string'
              },
              userType: {
                $ref: '#/components/schemas/UserType'
              }
            }
          },
          LoginRequest: {
            type: 'object',
            properties: {
              username: {
                type: 'string'
              },
              password: {
                type: 'string',
                minLength: 6
              }
            }
          },
          VerifyAccountRequest: {
            type: 'object',
            properties: {
              code: {
                type: 'string'
              }
            }
          },
          LoginResponse: {
            type: 'object',
            properties: {
              id: {
                type: 'string'
              },
              username: {
                type: 'string'
              },
              email: {
                type: 'string'
              },
              firstName: {
                type: 'string'
              },
              lastName: {
                type: 'string'
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              }
            }
          },
          RatesEstimateRequest: {
            type: 'object',
            properties: {
              shipmentId: {
                type: 'string',
                nullable: true
              },
              shipment: {
                nullable: true,
                $ref: '#/components/schemas/Shipment'
              },
              rateOptions: {
                $ref: '#/components/schemas/RateOptions'
              }
            }
          },
          RatesEstimateResponse: {
            description: 'Rates Results',
            $ref: '#/components/schemas/RatesResults'
          },
          CreateLabelFromRateRequest: {
            description: 'Create Label From Rate Request',
            $ref: '#/components/schemas/LabelWithoutShipment'
          },
          CreateLabelFromShipmentDetailsRequest: {
            description: 'Create Label From Shipment Details Request',
            $ref: '#/components/schemas/Label'
          },
          ValidateAddressesRequest: {
            type: 'array',
            description: 'Create Label From Shipment Details Request',
            items: {
              $ref: '#/components/schemas/Address'
            }
          },
          Shipment: {
            type: 'object',
            required: ['shipTo', 'packages'],
            description: 'The shipment object',
            properties: {
              validateAddress: {
                type: 'string',
                nullable: true,
                example: 'no_validation',
                description: 'The possible validate address values',
                $ref: '#/components/schemas/ValidateAddress'
              },
              carrierId: {
                type: 'string',
                nullable: true,
                example: 'se-5107649',
                description: 'The carrier account that is billed for the shipping charges'
              },
              serviceCode: {
                type: 'string',
                nullable: true,
                description:
                  'The carrier service used to ship the package, such as fedex_ground, usps_first_class_mail, flat_rate_envelope, etc.'
              },
              externalOrderId: {
                type: 'string',
                nullable: true,
                description: 'ID that the Order Source assigned'
              },
              items: {
                type: 'array',
                nullable: true,
                description:
                  'Describe the packages included in this shipment as related to potential metadata that was imported from external order sources',
                items: {
                  $ref: '#/components/schemas/ShipmentItem'
                }
              },
              taxIdentifiers: {
                type: 'array',
                nullable: true,
                items: {
                  $ref: '#/components/schemas/TaxIdentifier'
                }
              },
              externalShipmentId: {
                type: 'string',
                nullable: true,
                description: 'You can optionally use this field to store your own identifier for this shipment.'
              },
              shipDate: {
                type: 'string',
                nullable: true,
                format: 'date-time',
                description:
                  'The date that the shipment was (or will be) shippped. ShipEngine will take the day of week into consideration., For example, if the carrier does not operate on Sundays, then a package that would have shipped on Sunday will ship on Monday instead.'
              },
              shipTo: {
                description: "The recipient's mailing address",
                $ref: '#/components/schemas/ShippingAddress'
              },
              shipFrom: {
                nullable: true,
                description:
                  'The warehouse that the shipment is being shipped from. Either warehouse_id or ship_from must be specified.',
                $ref: '#/components/schemas/ShippingAddress'
              },
              wareHouseId: {
                type: 'string',
                nullable: true,
                description:
                  'The warehouse that the shipment is being shipped from. Either warehouse_id or ship_from must be specified.'
              },
              returnTo: {
                nullable: true,
                description: 'The return address for this shipment. Defaults to the ship_from address.',
                $ref: '#/components/schemas/ShippingAddress'
              },
              confirmation: {
                nullable: true,
                description: 'The type of delivery confirmation that is required for this shipment.',
                $ref: '#/components/schemas/DeliveryConfirmation'
              },
              customs: {
                nullable: true,
                description: 'Customs information. This is usually only needed for international shipments.',
                $ref: '#/components/schemas/CustomInfo'
              },
              advancedOptions: {
                nullable: true,
                description: 'Advanced shipment options. These are entirely optional.',
                $ref: '#/components/schemas/AdvancedOptions'
              },
              originType: {
                nullable: true,
                description: 'Indicates if the package will be picked up or dropped off by the carrier',
                $ref: '#/components/schemas/OriginType'
              },
              insuranceProvider: {
                nullable: true,
                description: 'The insurance provider to use for any insured packages in the shipment.',
                $ref: '#/components/schemas/InsuranceProvider'
              },
              orderSourceCode: {
                nullable: true,
                description: 'The order sources that are supported by ShipEngine',
                $ref: '#/components/schemas/OrderSourceCode'
              },
              packages: {
                type: 'array',
                description: 'The packages in the shipment.',
                items: {
                  $ref: '#/components/schemas/Package'
                }
              }
            }
          },
          ShipmentItem: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                nullable: true,
                description: 'item name'
              },
              salesOrderId: {
                type: 'string',
                nullable: true,
                description: 'sales order id'
              },
              salesOrderItemId: {
                type: 'string',
                nullable: true,
                description: 'sales order item id'
              },
              quantity: {
                type: 'integer',
                format: 'int32',
                nullable: true,
                description: 'The quantity of this item included in the shipment'
              },
              sku: {
                type: 'string',
                nullable: true,
                description: 'Item Stock Keeping Unit'
              },
              externalOrderId: {
                type: 'string',
                nullable: true,
                description: 'external order id'
              },
              externalOrderItemId: {
                type: 'string',
                nullable: true,
                description: 'external order item id'
              },
              asin: {
                type: 'string',
                nullable: true,
                description: 'Amazon Standard Identification Number'
              },
              orderSourceCode: {
                nullable: true,
                description: 'The order sources that are supported by ShipEngine',
                $ref: '#/components/schemas/OrderSourceCode'
              }
            }
          },
          TaxIdentifier: {
            type: 'object',
            properties: {
              taxableEntityType: {
                description: 'The taxable entity type for this tax item',
                $ref: '#/components/schemas/TaxableEntityType'
              },
              identifierType: {
                description: 'Determines how FedEx will pickup your packages',
                $ref: '#/components/schemas/IdentifierType'
              },
              issuingAuthority: {
                description:
                  'The authority that issued this tax. This must be a valid 2 character ISO 3166 Alpha 2 country code.',
                oneOf: [
                  {
                    $ref: '#/components/schemas/Country'
                  },
                  {
                    type: 'string'
                  }
                ]
              },
              value: {
                type: 'string',
                description: 'The value of the identifier'
              }
            }
          },
          CustomInfo: {
            type: 'object',
            properties: {
              contents: {
                description:
                  'The type of contents in this shipment. This may impact import duties or customs treatment.',
                $ref: '#/components/schemas/Contents'
              },
              nonDelivery: {
                description: 'Indicates what to do if a package is unable to be delivered.',
                $ref: '#/components/schemas/NonDelivery'
              },
              customsItems: {
                type: 'array',
                nullable: true,
                description: 'Customs declarations for each item in the shipment.',
                items: {
                  $ref: '#/components/schemas/CustomItem'
                }
              }
            }
          },
          CustomItem: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                nullable: true,
                description: 'A description of the item'
              },
              quantity: {
                type: 'integer',
                format: 'int32',
                nullable: true,
                description: 'The quantity of this item in the shipment.'
              },
              value: {
                nullable: true,
                description: 'The declared customs value of each item',
                $ref: '#/components/schemas/MonetaryValue'
              },
              harmonizedTariffCode: {
                type: 'string',
                nullable: true,
                description: 'The Harmonized Tariff Code of this item.'
              },
              countryOfOrigin: {
                nullable: true,
                description: 'The two-letter ISO 3166-1 country code where this item originated',
                ref: '#/components/schemas/Country'
              },
              unitOfMeasure: {
                type: 'string',
                nullable: true
              },
              sku: {
                type: 'string',
                nullable: true,
                description: 'The SKU (Stock Keeping Unit) of the customs item'
              },
              skuDescription: {
                type: 'string',
                nullable: true,
                description: "Description of the Custom Item's SKU"
              }
            }
          },
          AdvancedOptions: {
            type: 'object',
            properties: {
              billToAccount: {
                nullable: true,
                description:
                  'This field is used to bill shipping costs to a third party. This field must be used in conjunction with the bill_to_country_code, bill_to_party, and bill_to_postal_code fields.',
                $ref: '#/components/schemas/BillToAccount'
              },
              billToCountryCode: {
                nullable: true,
                description:
                  'The two-letter ISO 3166-1 country code of the third-party that is responsible for shipping costs.',
                $ref: '#/components/schemas/Country'
              },
              billToParty: {
                nullable: true,
                description:
                  'Indicates whether to bill shipping costs to the recipient or to a third-party. When billing to a third-party, the bill_to_account, bill_to_country_code, and bill_to_postal_code fields must also be set.',
                $ref: '#/components/schemas/BillToParty'
              },
              billToPostalCode: {
                type: 'string',
                nullable: true,
                description: 'The postal code of the third-party that is responsible for shipping costs.'
              },
              containsAlcohol: {
                type: 'boolean',
                nullable: true,
                description: 'Indicates that the shipment contains alcohol.'
              },
              deliveryDutyPaid: {
                type: 'boolean',
                nullable: true,
                description:
                  'Indicates that the shipper is paying the international delivery duties for this shipment. This option is supported by UPS, FedEx, and DHL Express.'
              },
              dryIce: {
                type: 'boolean',
                nullable: true,
                description: 'Indicates if the shipment contain dry ice'
              },
              dryIceWeight: {
                type: 'object',
                nullable: true,
                description: 'The weight of the dry ice in the shipment',
                properties: {
                  value: {
                    type: 'integer',
                    format: 'inte32'
                  },
                  unit: {
                    type: 'string',
                    enume: ['pound', 'ounce', 'gram', 'kilogram']
                  }
                }
              },
              nonMachinable: {
                type: 'boolean',
                nullable: true,
                description:
                  'Indicates that the package cannot be processed automatically because it is too large or irregularly shaped.  This is primarily for USPS shipments. See Section 1.2 of the USPS parcel standards for details.'
              },
              saturdayDelivery: {
                type: 'boolean',
                nullable: true,
                description: 'Enables Saturday delivery, if supported by the carrier.'
              },
              useUPSGroundFreightPricing: {
                type: 'boolean',
                nullable: true,
                description:
                  'Whether to use UPS Ground Freight pricing. If enabled, then a freight_class must also be specified.'
              },
              freightClass: {
                type: 'string',
                nullable: true,
                description:
                  'The National Motor Freight Traffic Association freight class, such as "77.5", "110", or "250".'
              },
              customField1: {
                type: 'string',
                nullable: true,
                description: 'An arbitrary field that can be used to store information about the shipment.'
              },
              customField2: {
                type: 'string',
                nullable: true,
                description: 'An arbitrary field that can be used to store information about the shipment.'
              },
              customField3: {
                type: 'string',
                nullable: true,
                description: 'An arbitrary field that can be used to store information about the shipment.'
              },
              originType: {
                nullable: true,
                description: 'Indicates if the package will be picked up or dropped off by the carrier',
                $ref: '#/components/schemas/OriginType'
              },
              shipperRelease: {
                type: 'boolean',
                nullable: true
              },
              collectOnDelivery: {
                type: 'object',
                nullable: true,
                description: 'Defer payment until package is delivered, instead of when it is ordered.',
                properties: {
                  paymentType: {
                    $ref: '#/components/schemas/PaymentType'
                  },
                  paymentAmount: {
                    type: 'object',
                    properties: {
                      amount: {
                        type: 'number'
                      },
                      currency: {
                        $ref: '#/components/schemas/Currency'
                      }
                    }
                  }
                }
              }
            }
          },
          Package: {
            type: 'object',
            required: ['weight'],
            properties: {
              packageCode: {
                description:
                  'The package type, such as thick_envelope, small_flat_rate_box, large_package, etc. The code package indicates a custom or unknown package type.',
                nullable: true,
                $ref: '#/components/schemas/PackageCode'
              },
              weight: {
                description: 'The package weight',
                $ref: '#/components/schemas/Weight'
              },
              dimensions: {
                nullable: true,
                description: 'The package dimensions',
                $ref: '#/components/schemas/Dimensions'
              },
              insuredValue: {
                nullable: true,
                description:
                  'The insured value of the package. Requires the insurance_provider field of the shipment to be set.',
                $ref: '#/components/schemas/MonetaryValue'
              },
              labelMessages: {
                nullable: true,
                description:
                  'Custom messages to print on the shipping label for the package. These are typically used to print invoice numbers, product numbers, or other internal reference numbers.  Not all carriers support label messages. The number of lines and the maximum length of each line also varies by carrier.',
                $ref: '#/components/schemas/LabelMessages'
              },
              externalPackageId: {
                type: 'string',
                nullable: true,
                description: 'An external package id.'
              }
            }
          },
          Dimensions: {
            type: 'object',
            properties: {
              unit: {
                type: 'string',
                description: 'The dimension units that are supported by ShipEngine.'
              },
              length: {
                type: 'number',
                description: 'The length of the package, in the specified unit'
              },
              width: {
                type: 'number',
                description: 'The width of the package, in the specified unit'
              },
              height: {
                type: 'number',
                description: 'The height of the package, in the specified unit'
              }
            }
          },
          LabelMessages: {
            type: 'object',
            properties: {
              reference1: {
                type: 'string',
                description:
                  'The first line of the custom label message. Some carriers may prefix this line with something like "REF", "Reference", "Trx Ref No.", etc.'
              },
              reference2: {
                type: 'string',
                description:
                  'The second line of the custom label message. Some carriers may prefix this line with something like "INV", "Reference 2", "Trx Ref No.", etc.'
              },
              reference3: {
                type: 'string',
                description:
                  'The third line of the custom label message. Some carriers may prefix this line with something like "PO", "Reference 3", etc.'
              }
            }
          },
          Weight: {
            type: 'object',
            properties: {
              unit: {
                type: 'string'
              },
              value: {
                type: 'number'
              }
            }
          },
          ShippingAddress: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description:
                  'The name of a contact person at this address. This field may be set instead of - or in addition to - the company_name field.'
              },
              phone: {
                type: 'string',
                description:
                  'The phone number of a contact person at this address. The format of this phone number varies depending on the country.'
              },
              companyName: {
                type: 'string',
                nullable: true,
                description: 'If this is a business address, then the company name should be specified here.'
              },
              addressLine1: {
                type: 'string',
                description:
                  'The first line of the street address. For some addresses, this may be the only line. Other addresses may require 2 or 3 lines.'
              },
              addressLine2: {
                type: 'string',
                nullable: true,
                description: 'The second line of the street address. For some addresses, this line may not be needed.'
              },
              addressLine3: {
                type: 'string',
                nullable: true,
                description: 'The third line of the street address. For some addresses, this line may not be needed.'
              },
              cityLocality: {
                type: 'string',
                description: 'The name of the city or locality'
              },
              stateProvince: {
                type: 'string',
                description:
                  'The state or province. For some countries (including the U.S.) only abbreviations are allowed. Other countries allow the full name or abbreviation.'
              },
              postalCode: {
                type: 'string',
                description: 'postal code'
              },
              countryCode: {
                type: 'string',
                description: 'The two-letter ISO 3166-1 country code'
              },
              addressResidentialIndicator: {
                type: 'string',
                example: 'yes',
                description: 'Indicates whether this is a residential address.',
                enum: ['unknown', 'yes', 'no']
              }
            }
          },
          RateOptions: {
            type: 'object',
            properties: {
              carrierIds: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              packageTypes: {
                type: 'array',
                nullable: true,
                items: {
                  type: 'string'
                }
              },
              serviceCodes: {
                type: 'array',
                nullable: true,
                items: {
                  type: 'string'
                }
              },
              calculateTaxAmount: {
                type: 'boolean',
                nullable: true
              },
              preferredCurrency: {
                nullable: true,
                oneOf: [
                  {
                    $ref: '#/components/schemas/Currency'
                  },
                  {
                    type: 'string'
                  }
                ]
              }
            }
          },
          MonetaryValue: {
            type: 'object',
            properties: {
              currency: {
                description: 'The currencies that are supported by ShipEngine.',
                $ref: '#/components/schemas/Currency'
              },
              amount: {
                type: 'integer',
                description: 'The monetary amount, in the specified currency.',
                format: 'int64'
              }
            }
          },
          BillToAccount: {
            type: 'string',
            enum: ['bill_to_country_code', 'bill_to_party', 'bill_to_postal_code']
          },
          BillToParty: {
            type: 'string',
            enum: ['recipient', 'third_party']
          },
          ValidationStatus: {
            type: 'string',
            enum: ['valid', 'invalid', 'has_warnings', 'unknown']
          },
          ShipmentStatus: {
            type: 'string',
            enum: ['pending', 'processing', 'label_purchased', 'cancelled']
          },
          Currency: {
            type: 'string',
            enum: ['usd', 'cad', 'aud', 'gbp', 'eur', 'nzd']
          },
          Contents: {
            type: 'string',
            enum: ['merchandise', 'documents', 'gift', 'returned_goods', 'sample']
          },
          NonDelivery: {
            type: 'string',
            enum: ['return_to_sender', 'treat_as_abandoned']
          },
          DeliveryConfirmation: {
            type: 'string',
            enum: ['none', 'delivery', 'signature', 'adult_signature', 'direct_signature', 'delivery_mailed']
          },
          InsuranceProvider: {
            type: 'string',
            enum: ['none', 'shipsurance', 'carrier', 'third_party']
          },
          OrderSourceCode: {
            type: 'string',
            enum: [
              'amazon_ca',
              'amazon_us',
              'brightpearl',
              'channel_advisor',
              'cratejoy',
              'ebay',
              'etsy',
              'jane',
              'groupon_goods',
              'magento',
              'paypal',
              'seller_active',
              'shopify',
              'stitch_labs',
              'squarespace',
              'three_dcart',
              'tophatter',
              'walmart',
              'woo_commerce',
              'volusion'
            ]
          },
          OriginType: {
            type: 'string',
            enum: ['pickup', 'drop_off']
          },
          PackageCode: {
            type: 'string',
            enum: ['thick_envelope', 'small_flat_rate_box', 'large_package']
          },
          PaymentType: {
            type: 'string',
            enum: ['any', 'cash', 'cash_equivalent', 'none']
          },
          TaxableEntityType: {
            type: 'string',
            enum: ['shipper', 'recipient']
          },
          IdentifierType: {
            type: 'string',
            enum: ['vat', 'eori', 'ssn', 'ein', 'tin', 'ioss', 'pan', 'voec']
          },
          ValidateAddress: {
            type: 'string',
            enum: ['no_validation', 'validate_only', 'validate_and_clean']
          },
          Country: {
            type: 'string',
            example: 'US',
            enum: [
              'AF',
              'AX',
              'AL',
              'DZ',
              'AS',
              'AD',
              'AO',
              'AI',
              'AQ',
              'AG',
              'AR',
              'AM',
              'AW',
              'AU',
              'AT',
              'AZ',
              'BS',
              'BH',
              'BD',
              'BB',
              'BY',
              'BE',
              'BZ',
              'BJ',
              'BM',
              'BT',
              'BO',
              'BA',
              'BW',
              'BV',
              'BR',
              'IO',
              'BN',
              'BG',
              'BF',
              'BI',
              'KH',
              'CM',
              'CA',
              'CV',
              'KY',
              'CF',
              'TD',
              'CL',
              'CN',
              'CX',
              'CC',
              'CO',
              'KM',
              'CG',
              'CD',
              'CK',
              'CR',
              'CI',
              'HR',
              'CU',
              'CY',
              'CZ',
              'DK',
              'DJ',
              'DM',
              'DO',
              'EC',
              'EG',
              'SV',
              'GQ',
              'ER',
              'EE',
              'ET',
              'FK',
              'FO',
              'FJ',
              'FI',
              'FR',
              'GF',
              'PF',
              'TF',
              'GA',
              'GM',
              'GE',
              'DE',
              'GH',
              'GI',
              'GR',
              'GL',
              'GD',
              'GP',
              'GU',
              'GT',
              'GG',
              'GN',
              'GW',
              'GY',
              'HT',
              'HM',
              'VA',
              'HN',
              'HK',
              'HU',
              'IS',
              'IN',
              'ID',
              'IR',
              'IQ',
              'IE',
              'IM',
              'IL',
              'IT',
              'JM',
              'JP',
              'JE',
              'JO',
              'KZ',
              'KE',
              'KI',
              'KR',
              'KW',
              'KG',
              'LA',
              'LV',
              'LB',
              'LS',
              'LR',
              'LY',
              'LI',
              'LT',
              'LU',
              'MO',
              'MK',
              'MG',
              'MW',
              'MY',
              'MV',
              'ML',
              'MT',
              'MH',
              'MQ',
              'MR',
              'MU',
              'YT',
              'MX',
              'FM',
              'MD',
              'MC',
              'MN',
              'ME',
              'MS',
              'MA',
              'MZ',
              'MM',
              'NA',
              'NR',
              'NP',
              'NL',
              'NC',
              'NZ',
              'NI',
              'NE',
              'NG',
              'NU',
              'NF',
              'MP',
              'NO',
              'OM',
              'PK',
              'PW',
              'PS',
              'PA',
              'PG',
              'PY',
              'PE',
              'PH',
              'PN',
              'PL',
              'PT',
              'PR',
              'QA',
              'RE',
              'RO',
              'RU',
              'RW',
              'BL',
              'SH',
              'KN',
              'LC',
              'MF',
              'PM',
              'VC',
              'WS',
              'SM',
              'ST',
              'SA',
              'SN',
              'RS',
              'SC',
              'SL',
              'SG',
              'SK',
              'SI',
              'SB',
              'SO',
              'ZA',
              'GS',
              'ES',
              'LK',
              'SD',
              'SR',
              'SJ',
              'SZ',
              'SE',
              'CH',
              'SY',
              'TW',
              'TJ',
              'TZ',
              'TH',
              'TL',
              'TG',
              'TK',
              'TO',
              'TT',
              'TN',
              'TR',
              'TM',
              'TC',
              'TV',
              'UG',
              'UA',
              'AE',
              'GB',
              'US',
              'UM',
              'UY',
              'UZ',
              'VU',
              'VE',
              'VN',
              'VG',
              'VI',
              'WF',
              'EH',
              'YE',
              'ZM',
              'ZW'
            ]
          },
          ErrorCode: {
            type: 'string',
            enum: [
              'auto_fund_not_supported',
              'batch_cannot_be_modified',
              'carrier_conflict',
              'carrier_not_connected',
              'carrier_not_supported',
              'confirmation_not_supported',
              'field_conflict',
              'field_value_required',
              'forbidden',
              'identifier_conflict',
              'identifiers_must_match',
              'incompatible_paired_labels',
              'invalid_address',
              'invalid_billing_plan',
              'invalid_charge_event',
              'invalid_field_value',
              'invalid_identifier',
              'invalid_status',
              'invalid_string_length',
              'label_images_not_supported',
              'meter_failure',
              'not_found',
              'rate_limit_exceeded',
              'request_body_required',
              'return_label_not_supported',
              'subscription_inactive',
              'terms_not_accepted',
              'timeout',
              'tracking_not_supported',
              'trial_expired',
              'unauthorized',
              'unspecified',
              'verification_failure',
              'warehouse_conflict',
              'webhook_event_type_conflict'
            ]
          },
          ErrorSource: {
            type: 'string',
            enum: [
              'auto_fund_not_supported',
              'batch_cannot_be_modified',
              'carrier_conflict',
              'carrier_not_connected',
              'carrier_not_supported',
              'confirmation_not_supported',
              'field_conflict',
              'field_value_required',
              'forbidden',
              'identifier_conflict',
              'identifiers_must_match',
              'incompatible_paired_labels',
              'invalid_address',
              'invalid_billing_plan',
              'invalid_charge_event',
              'invalid_field_value',
              'invalid_identifier',
              'invalid_status',
              'invalid_string_length',
              'label_images_not_supported',
              'meter_failure',
              'not_found',
              'rate_limit_exceeded',
              'request_body_required',
              'return_label_not_supported',
              'subscription_inactive',
              'terms_not_accepted',
              'timeout',
              'tracking_not_supported',
              'trial_expired',
              'unauthorized',
              'unspecified',
              'verification_failure',
              'warehouse_conflict',
              'webhook_event_type_conflict'
            ]
          },
          ErrorType: {
            type: 'string',
            enum: ['account_status', 'security', 'validation', 'business_rules', 'system']
          },
          UserType: {
            type: 'integer',
            description: 'Profile Type',
            'x-enumNames': [
              'ShippingCompanyOrEmployee',
              'TruckCompanyOwnerOperator',
              'VendorsAndServices',
              'PassengerVehicleDrivers',
              'AgentsBrokersAndFreightForwarders'
            ],
            enum: [0, 1, 2, 3, 4]
          },
          RatesResults: {
            type: 'object',
            properties: {
              shipmentId: {
                type: 'string',
                description: 'A string that uniquely identifies the shipment'
              },
              carrierId: {
                type: 'string',
                nullable: true,
                description: 'The carrier account that is billed for the shipping charges'
              },
              serviceCode: {
                type: 'string',
                nullable: true,
                description: 'The carrier service used to ship the package'
              },
              externalOrderId: {
                type: 'string',
                nullable: true,
                description: 'ID that the Order Source assigned'
              },
              items: {
                type: 'array',
                nullable: true,
                items: {
                  $ref: '#/components/schemas/ShipmentItem'
                }
              },
              taxIdentifiers: {
                type: 'array',
                nullable: true,
                items: {
                  $ref: '#/components/schemas/TaxIdentifier'
                }
              },
              externalShipmentId: {
                type: 'string',
                nullable: true
              },
              shipDate: {
                type: 'string',
                format: 'date-time'
              },
              createdAt: {
                type: 'string',
                format: 'date-time'
              },
              modifiedAt: {
                type: 'string',
                format: 'date-time'
              },
              shipmentStatus: {
                $ref: '#/components/schemas/ShipmentStatus'
              },
              shipTo: {
                nullable: true,
                $ref: '#/components/schemas/ShippingAddress'
              },
              shipFrom: {
                nullable: true,
                $ref: '#/components/schemas/ShippingAddress'
              },
              warehouseId: {
                type: 'string',
                nullable: true
              },
              returnTo: {
                $ref: '#/components/schemas/ShippingAddress'
              },
              confirmation: {
                $ref: '#/components/schemas/DeliveryConfirmation'
              },
              customs: {
                type: 'object',
                nullable: true,
                properties: {
                  contents: {
                    $ref: '#/components/schemas/Contents'
                  },
                  nonDelivery: {
                    $ref: '#/components/schemas/NonDelivery'
                  },
                  customsItems: {
                    nullable: true,
                    $ref: '#/components/schemas/CustomItem'
                  }
                }
              },
              advancedOptions: {
                $ref: '#/components/schemas/AdvancedOptions'
              },
              originType: {
                nullable: true,
                $ref: '#/components/schemas/OriginType'
              },
              insuranceProvider: {
                $ref: '#/components/schemas/InsuranceProvider'
              },
              tags: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string'
                    }
                  }
                }
              },
              orderSourceCode: {
                nullable: true,
                oneOf: [
                  {
                    $ref: '#/components/schemas/OrderSourceCode'
                  },
                  {
                    type: 'string'
                  }
                ]
              },
              packages: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Package'
                }
              },
              totalWeight: {
                type: 'object',
                properties: {
                  value: {
                    type: 'number'
                  },
                  unit: {
                    type: 'string',
                    enum: ['pound', 'ounce', 'gram', 'kilogram']
                  }
                }
              },
              rateResponse: {
                type: 'object',
                properties: {
                  rates: {
                    type: 'array',
                    nullable: true,
                    items: {
                      $ref: '#/components/schemas/Rate'
                    }
                  },
                  invalidRates: {
                    type: 'array',
                    nullable: true,
                    items: {
                      $ref: '#/components/schemas/Rate'
                    }
                  },
                  rateRequestId: {
                    type: 'string',
                    nullable: true
                  },
                  shipmentId: {
                    type: 'string',
                    nullable: true
                  },
                  createdAt: {
                    type: 'string',
                    nullable: true
                  },
                  status: {
                    type: 'string',
                    nullable: true,
                    enum: ['working', 'completed', 'partial', 'error']
                  },
                  errors: {
                    type: 'array',
                    nullable: true,
                    items: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          },
          Error: {
            type: 'object',
            properties: {
              errorSource: {
                $ref: '#/components/schemas/ErrorSource'
              },
              errorType: {
                $ref: '#/components/schemas/ErrorType'
              },
              errorCode: {
                $ref: '#/components/schemas/ErrorCode'
              },
              message: {
                type: 'string'
              }
            }
          },
          Rate: {
            type: 'object',
            properties: {
              rateId: {
                type: 'string'
              },
              rateType: {
                type: 'string',
                enum: ['check', 'shipment']
              },
              carrierId: {
                type: 'string'
              },
              shippingAmount: {
                $ref: '#/components/schemas/MonetaryValue'
              },
              insuranceAmount: {
                $ref: '#/components/schemas/MonetaryValue'
              },
              confirmationAmount: {
                $ref: '#/components/schemas/MonetaryValue'
              },
              otherAmount: {
                $ref: '#/components/schemas/MonetaryValue'
              },
              taxAmount: {
                nullable: true,
                $ref: '#/components/schemas/MonetaryValue'
              },
              zone: {
                type: 'integer',
                format: 'int32'
              },
              packageType: {
                type: 'string'
              },
              deliveryDays: {
                type: 'integer',
                nullable: true,
                format: 'int32'
              },
              guaranteedService: {
                type: 'boolean'
              },
              estimatedDeliveryDate: {
                type: 'string',
                nullable: true,
                format: 'date-time'
              },
              carrierDeliveryDays: {
                type: 'string',
                nullable: true
              },
              shipDate: {
                type: 'string',
                nullable: true
              },
              negotiatedRate: {
                type: 'boolean'
              },
              serviceType: {
                type: 'string'
              },
              serviceCode: {
                type: 'string'
              },
              trackable: {
                type: 'boolean'
              },
              carrierCode: {
                type: 'string'
              },
              carrierNickname: {
                type: 'string'
              },
              carrierFriendlyName: {
                type: 'string'
              },
              validationStatus: {
                $ref: '#/components/schemas/ValidationStatus'
              },
              warningMessages: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              errorMessages: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            }
          },
          LabelLayout: {
            type: 'string',
            enum: ['4x6', 'letter']
          },
          LabelFormat: {
            type: 'string',
            enum: ['pdf', 'png', 'zpl']
          },
          LabelDownloadType: {
            type: 'string',
            enum: ['url', 'inline']
          },
          DisplayScheme: {
            type: 'string',
            enum: ['label', 'qr_code']
          },
          LabelWithoutShipment: {
            type: 'object',
            required: ['rateId'],
            properties: {
              rateId: {
                type: 'string',
                example: 'se-4071004500'
              },
              validateAddress: {
                example: 'no_validation',
                $ref: '#/components/schemas/ValidateAddress'
              },
              labelLayout: {
                example: '4x6',
                $ref: '#/components/schemas/LabelLayout'
              },
              labelFormat: {
                example: 'pdf',
                $ref: '#/components/schemas/LabelFormat'
              },
              labelDownloadType: {
                example: 'url',
                $ref: '#/components/schemas/LabelDownloadType'
              },
              displayScheme: {
                example: 'label',
                $ref: '#/components/schemas/DisplayScheme'
              }
            }
          },
          LabelChargeEvent: {
            type: 'string',
            enum: ['carrier_default', 'on_creation', 'on_carrier_acceptance']
          },
          Label: {
            type: 'object',
            required: ['shipment'],
            properties: {
              shipment: {
                $ref: '#/components/schemas/Shipment'
              },
              isReturnLabel: {
                type: 'boolean',
                nullable: true
              },
              rmaNumber: {
                type: 'string',
                nullable: true
              },
              chargeEvent: {
                nullable: true,
                $ref: '#/components/schemas/LabelChargeEvent'
              },
              outboundLabelId: {
                type: 'string',
                nullable: true
              },
              validateAddress: {
                nullable: true,
                $ref: '#/components/schemas/ValidateAddress'
              },
              labelDownloadType: {
                nullable: true,
                $ref: '#/components/schemas/LabelDownloadType'
              },
              labelFormat: {
                nullable: true,
                $ref: '#/components/schemas/LabelFormat'
              },
              displayScheme: {
                nullable: true,
                $ref: '#/components/schemas/DisplayScheme'
              },
              labelLayout: {
                nullable: true,
                $ref: '#/components/schemas/LabelLayout'
              },
              labelImageId: {
                type: 'string'
              }
            }
          },
          Address: {
            type: 'object',
            properties: {
              addressLine1: {
                type: 'string',
                example: '3800 N Lamar Blvd'
              },
              addressLine2: {
                type: 'string',
                example: '#220',
                nullable: true
              },
              addressLine3: {
                type: 'string',
                nullable: true,
                example: null
              },
              countryCode: {
                $ref: '#/components/schemas/Country'
              },
              name: {
                type: 'string',
                example: 'John Smith'
              },
              companyName: {
                type: 'string',
                example: 'ShipStation'
              },
              phone: {
                type: 'string',
                nullable: true,
                example: null
              },
              cityLocality: {
                type: 'string',
                example: 'Austin'
              },
              stateProvince: {
                type: 'string',
                example: 'TX'
              },
              postalCode: {
                type: 'string',
                example: '78756'
              },
              addressResidentialIndicator: {
                $ref: '#/components/schemas/AddressResidentialIndicator'
              }
            }
          },
          AddressResidentialIndicator: {
            type: 'string',
            example: 'no',
            enum: ['unknown', 'yes', 'no']
          }
        }
      },
      security: []
    }
  })
  return spec
}
