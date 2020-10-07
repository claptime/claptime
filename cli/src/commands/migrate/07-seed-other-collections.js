const { Command } = require('@oclif/command');
const dynamodb = require('claptime-commons/dynamodb');
const { getApiConfig, getCurrentEnv } = require('claptime-commons/dev/amplify');
const { uuidV4 } = require('claptime-commons/utils');
const { commonFlags, confirm } = require('../../utils');

const videoNodes = {
  'la-terre': {
    id: '86fc6820-34da-4fcd-8de4-36d437667038',
    createdAt: '2020-01-09T16:34:13.929Z',
    createdBy: '1eab974a-7e94-42bb-b704-5dd8616823f3',
  },
  'an-other-part-of-the-world': {
    id: '75acaae8-7024-478e-9cce-dd399e0175d0',
    createdAt: '2020-01-11T13:26:59.385Z',
    createdBy: '1eab974a-7e94-42bb-b704-5dd8616823f3',
  },
  "l'art-de-la-chute": {
    id: '24461fa4-fbbc-4dcc-a33c-ff687cdd3ca2',
    createdAt: '2020-01-11T16:17:10.293Z',
    createdBy: '4811ac78-01ac-4893-8fdd-e07a4b656cf4',
  },
  'ceux-qui-marchent-contre-le-vent': {
    id: '97749cae-e8d3-4ccf-9f8d-dd4b5784a5e3',
    createdAt: '2020-01-11T16:33:58.786Z',
    createdBy: '4811ac78-01ac-4893-8fdd-e07a4b656cf4',
  },
  diving: {
    id: 'c0fb7ffe-39c8-4800-8bd7-868882d0c0f1',
    createdAt: '2020-01-11T17:32:00.686Z',
    createdBy: '4811ac78-01ac-4893-8fdd-e07a4b656cf4',
  },
  mira: {
    id: 'e54db0f3-4444-49b3-910d-75403dce3ed1',
    createdAt: '2020-01-19T15:45:41.186Z',
    createdBy: '4811ac78-01ac-4893-8fdd-e07a4b656cf4',
  },
  mst: {
    id: 'cc44021f-0928-4439-ac7b-2339ef1463f6',
    createdAt: '2020-01-20T18:45:34.169Z',
    createdBy: '1eab974a-7e94-42bb-b704-5dd8616823f3',
  },
  'un-frere': {
    id: 'a21c618f-a071-4798-8cb1-25ea24dd38b8',
    createdAt: '2020-02-18T09:10:43.432Z',
    createdBy: 'be858eeb-40c0-4b5f-8ec7-641534ca6fac',
  },
  "l'aventure-moderne": {
    id: '1539bdd1-915d-4d7b-b62e-96dc8173c42d',
    createdAt: '2020-02-18T09:16:36.829Z',
    createdBy: 'be858eeb-40c0-4b5f-8ec7-641534ca6fac',
  },
  'amour-toujours': {
    id: '501c368e-1b9f-4c3f-a6a7-e48e8fba4f93',
    createdAt: '2020-02-18T09:47:29.384Z',
    createdBy: 'be858eeb-40c0-4b5f-8ec7-641534ca6fac',
  },
  'le-trou': {
    id: '095b51ba-b4e5-4f9b-a766-7d4cf7938775',
    createdAt: '2020-04-09T17:12:46.311Z',
    createdBy: 'dbedfe93-f25d-4e8f-a5f0-6d232f953670',
  },
  'un-maniaque-derriere-moi': {
    id: 'e5585408-33fc-49df-a4be-731181b7f5f7',
    createdAt: '2020-04-10T09:58:18.548Z',
    createdBy: 'dbedfe93-f25d-4e8f-a5f0-6d232f953670',
  },
  'trop-shoe': {
    id: '52d46156-45b2-4fcb-96af-21564367a6fe',
    createdAt: '2020-04-10T13:57:13.018Z',
    createdBy: 'bf5c8c99-cee8-4510-9989-bb1c2ecced60',
  },
  perspective: {
    id: 'c1a45ce8-7830-448b-bf26-741e0f6b43b4',
    createdAt: '2020-04-12T16:21:03.818Z',
    createdBy: '7b2d0e77-e190-4492-a90c-93ceb5598406',
  },
  'une-scene': {
    id: '04d14b43-4274-4808-9353-3d2136340894',
    createdAt: '2020-04-13T11:59:45.724Z',
    createdBy: '4206a8dd-4d3b-4c8c-8da8-403827c54f79',
  },
  'hope-is-french': {
    id: '0b411d80-bdd4-446f-b610-097f95b469ae',
    createdAt: '2020-04-13T13:14:22.146Z',
    createdBy: 'ea684a6c-6aab-4c9b-848c-7cfcc0721b4d',
  },
  'detras-de-la-utopia': {
    id: '3d7398a0-84ef-4c85-88d2-157cbbec3f23',
    createdAt: '2020-04-14T08:52:32.676Z',
    createdBy: '3020a815-6b14-4b5b-aae9-d1ef0cc37fa3',
  },
  'la-nudite-(projet-moteur-2020)': {
    id: '17a99f60-67ff-471b-948c-079d5ce479d5',
    createdAt: '2020-04-14T12:31:43.833Z',
    createdBy: '22d86164-d6b8-459c-ace6-92343d0be75b',
  },
  thebaide: {
    id: '5b930ce3-1a96-454c-88c1-1495965b5e3b',
    createdAt: '2020-04-15T00:25:37.880Z',
    createdBy: '189f30d4-f002-4f5a-b459-5fbdc9d986aa',
  },
  "un-battement-d'ailes": {
    id: '7fff13da-d912-47b7-8452-77a236b60b91',
    createdAt: '2020-04-15T11:37:00.443Z',
    createdBy: '418c7450-508f-4e12-9123-89c036c3a459',
  },
  roundabout: {
    id: '8394d5d4-3659-4457-a803-12dc85f7ed0a',
    createdAt: '2020-04-15T17:11:24.778Z',
    createdBy: '1b69061f-1985-4500-94c3-da00c5a6d33a',
  },
  'une-cloche-dans-la-tete': {
    id: 'bf2b8843-c7e1-4d0f-aac0-213f1414a706',
    createdAt: '2020-04-16T12:21:07.299Z',
    createdBy: '2a7d9e24-3501-42b7-ac43-a63ed6c15bff',
  },
  'la-melodie-du-passe': {
    id: 'c4f97742-b228-4ddc-98e5-c8ec90e55887',
    createdAt: '2020-04-19T11:21:18.746Z',
    createdBy: '7d68fc49-4f15-4f1f-b127-a63b04ad1ac8',
  },
  'les-4-sales-locataires': {
    id: '153fe3ae-c4e3-493a-b909-d444543d3cd2',
    createdAt: '2020-04-28T14:17:29.600Z',
    createdBy: '0997943a-6ac0-4b16-b1b8-9d67a5d31dae',
  },
  "l'inconnu-a-la-voix": {
    id: '962ea9bc-3d16-4336-8101-a0628d579eeb',
    createdAt: '2020-04-30T21:33:47.217Z',
    createdBy: '5f65e905-69da-4029-8d08-68114e63571c',
  },
  "journal-d'un-millenial": {
    id: '4679246d-ba44-464c-8136-4657ebb32af0',
    createdAt: '2020-05-01T10:57:09.761Z',
    createdBy: 'ecf42e88-0b05-434d-bd88-b16525926c11',
  },
  'sur-le-chemin': {
    id: '09e4e0a2-879f-4245-8892-e0ec58c2cfb9',
    createdAt: '2020-05-01T13:33:05.523Z',
    createdBy: 'b865388d-ea8e-4f5a-b605-59de17d5f92b',
  },
  'je-suis-rose': {
    id: 'b1d1facb-4b02-46bc-8330-7858de2fa7cf',
    createdAt: '2020-05-01T14:20:35.141Z',
    createdBy: 'b865388d-ea8e-4f5a-b605-59de17d5f92b',
  },
  'shut-in': {
    id: '67cdc69d-710e-4693-a98b-6397d65dfdf6',
    createdAt: '2020-05-01T14:49:29.445Z',
    createdBy: 'b865388d-ea8e-4f5a-b605-59de17d5f92b',
  },
  'sur-le-pave-le-skate': {
    id: 'e9d955ce-78c9-44fa-9a32-baa668036bfe',
    createdAt: '2020-05-08T17:36:16.488Z',
    createdBy: '58712c86-dbe3-4c4c-9756-846dc7668140',
  },
  "l'ivresse-des-conquerants": {
    id: '6cf26191-615f-49ec-a42f-0ba3c3c7481a',
    createdAt: '2020-05-22T11:42:16.452Z',
    createdBy: 'd3440f51-d59d-4406-abb5-1ee5b864967a',
  },
  'je-suis-un-otage.': {
    id: 'a7b66dc6-3e09-433a-ba95-6bbf2a01aa82',
    createdAt: '2020-05-26T09:19:05.897Z',
    createdBy: 'b7b3cfd5-6818-4109-9f11-a0f1fe247969',
  },
  oddatara: {
    id: '27a063c4-5687-47a1-8b1f-94b81bdabdb2',
    createdAt: '2020-06-06T12:29:52.955Z',
    createdBy: '102bfaf0-8117-4691-8b75-5a6463e316c3',
  },
  bulles: {
    id: '28700865-ab84-4e58-84e4-87f2fbd83f6b',
    createdAt: '2020-06-12T09:19:41.980Z',
    createdBy: '9034c30f-fbd8-4b2b-b67d-1ac47640d31e',
  },
  upir: {
    id: '55b562d3-2b80-4461-871d-105406556310',
    createdAt: '2020-06-25T14:44:17.588Z',
    createdBy: '737b97b1-e38d-4a2e-9d55-772ca3870880',
  },
  "il-y-a-quelqu'un-chez-nous": {
    id: 'f6aec7be-0415-4cd5-b7b3-dff257b64a3f',
    createdAt: '2020-07-07T10:49:44.388Z',
    createdBy: '57c454b9-0982-4c62-a99e-0d3c6f9b0be1',
  },
  'confini-confine': {
    id: 'd8581a1e-c256-4644-87cf-98ab7a0d88a6',
    createdAt: '2020-07-14T14:04:51.972Z',
    createdBy: 'bf5c8c99-cee8-4510-9989-bb1c2ecced60',
  },
};

const collections = {
  animation: {
    id: '4e4d8b71-d671-4b62-bbf1-d63741f73457',
    categories: {
      courtsMetrages: {
        id: 'ee5Ev5MHK',
        content: [videoNodes.mst, videoNodes["un-battement-d'ailes"]],
      },
      clips: {
        id: 'tFysUvKjX',
        content: [
          videoNodes['la-terre'],
          videoNodes['an-other-part-of-the-world'],
        ],
      },
    },
  },
  enQueteDeSens: {
    id: '189b65c5-6e61-4391-9b11-380eb4058fd9',
    categories: {
      societe: {
        id: 'nK3k19u2b',
        content: [
          videoNodes['un-frere'],
          videoNodes["l'aventure-moderne"],
          videoNodes['la-nudite-(projet-moteur-2020)'],
          videoNodes['ceux-qui-marchent-contre-le-vent'],
          videoNodes["l'art-de-la-chute"],
        ],
      },
      alternatives: {
        id: 'jURaSJeWT',
        content: [videoNodes['detras-de-la-utopia'], videoNodes.oddatara],
      },
      evasion: {
        id: '3FmcRzg9i',
        content: [videoNodes.bulles],
      },
    },
  },
  laCremeDuCourt: {
    id: 'db773154-36cd-4376-830f-423917b23bf0',
    categories: {
      feelGood: {
        id: 'oFDPaRHU3',
        content: [
          videoNodes.mira,
          videoNodes['an-other-part-of-the-world'],
          videoNodes['amour-toujours'],
        ],
      },
      sansPriseDeTete: {
        id: 'Mws7TKNka',
        content: [
          videoNodes['le-trou'],
          videoNodes["il-y-a-quelqu'un-chez-nous"],
          videoNodes['trop-shoe'],
          videoNodes['hope-is-french'],
          videoNodes['une-cloche-dans-la-tete'],
          videoNodes['confini-confine'],
        ],
      },
      lesTresCourts: {
        id: 'peB2JhvtC',
        content: [
          videoNodes['je-suis-rose'],
          videoNodes['shut-in'],
          videoNodes['je-suis-un-otage.'],
          videoNodes["journal-d'un-millenial"],
          videoNodes["un-battement-d'ailes"],
        ],
      },
      objetsFilmiquesNonIdentifies: {
        id: 'vZBU7cbN9',
        content: [
          videoNodes['la-terre'],
          videoNodes.mst,
          videoNodes["l'inconnu-a-la-voix"],
          videoNodes.roundabout,
          videoNodes.perspective,
          videoNodes.diving,
        ],
      },
      unPeuDeSerieux: {
        id: 'c7QmBVkOo',
        content: [videoNodes.thebaide, videoNodes['une-scene']],
      },
      frissonsGarantis: {
        id: 'Xyqo7OTJk',
        content: [
          videoNodes.upir,
          videoNodes['sur-le-chemin'],
          videoNodes['un-maniaque-derriere-moi'],
          videoNodes['la-melodie-du-passe'],
          videoNodes['les-4-sales-locataires'],
        ],
      },
      culturezVous: {
        id: 'VS3lm95l72',
        content: [
          videoNodes['sur-le-pave-le-skate'],
          videoNodes["l'ivresse-des-conquerants"],
        ],
      },
    },
  },
};

class SeedOtherCollectionsCommand extends Command {
  async run() {
    const { flags } = this.parse(SeedOtherCollectionsCommand);
    if (!(await confirm(flags))) return;

    const { id: apiId } = getApiConfig();
    const env = getCurrentEnv();

    const items = [];

    // eslint-disable-next-line guard-for-in
    for (const collection in collections) {
      const collectionId = collections[collection].id;
      console.log(
        `Processing collection ${collection} (id ${collectionId})...`,
      );
      // eslint-disable-next-line guard-for-in
      for (const { id: categoryId, content } of Object.values(
        collections[collection].categories,
      )) {
        items.push(
          ...content.map(({ id, createdAt, createdBy }) => ({
            __typename: 'CollectionVideoNode',
            'categoryId#createdAt': `${categoryId}#${createdAt}`,
            id: uuidV4(),
            collectionVideoNodeCollectionId: collectionId,
            categoryId,
            collectionVideoNodeVideoNodeId: id,
            createdAt,
            owner: createdBy,
            createdBy,
          })),
        );
      }
    }
    await dynamodb.putItems(`CollectionVideoNode-${apiId}-${env}`, items);
  }
}

SeedOtherCollectionsCommand.description = `
  Seed other initial collections based on a manual distribution.
`;

SeedOtherCollectionsCommand.flags = {
  yes: commonFlags.yes,
};

module.exports = SeedOtherCollectionsCommand;
