import jwt from 'jsonwebtoken';

class Token {
  /** @method createToken
   * used to create a JWT token
   * @param payload
   * @returns a jwt token
   */
  static createToken = (payload: any) => jwt.sign(payload, process.env.JWT_KEY!);

  /** @method verifyToken
   * used to verify a JWT token, check whether its valid or not
   * @param token
   * @returns string | object | null based on the token passed
   */
  static verifyToken = (token: string) => jwt.verify(token, process.env.JWT_KEY!);
}

export default Token;
