import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_TRZ } from '@trezoa/web3.js'
import { Nft, Sft, Metadata, Trezoaplex, isNftWithToken, isSftWithToken, NftWithToken, SftWithToken } from '@trezoaplex-foundation/js'

interface UserNFTsStore extends State {
  nftList: (NftWithToken | SftWithToken)[];
  getUserNFTs: (publicKey: PublicKey, connection: Connection) => void
}

function isMetadata(arg: any): arg is Metadata {
  return true;
}

const useUserNFTsStore = create<UserNFTsStore>((set, _get) => ({
  nftList: [],
  getUserNFTs: async (publicKey, connection) => {
    const trezoaplex = new Trezoaplex(connection);
    const metadatas = await trezoaplex.nfts().findAllByOwner({
      owner: publicKey,
    });

    const nfts = await Promise.all(metadatas.map(async (metadata) => {
      if (isMetadata(metadata)) {
        const nft = await trezoaplex.nfts().load({ metadata, tokenOwner: publicKey });
        if (isNftWithToken || isSftWithToken) {
          return nft as (NftWithToken | SftWithToken);
        }
        else {
          console.log("Unexpected Error: " + nft);
          return null;
        }
      } else {
        return metadata as (NftWithToken | SftWithToken);
      }
    }));

    set((s) => {
      s.nftList = nfts;
      // console.log(`nftList updated, `, nfts);
    });
  },
}));

export default useUserNFTsStore;