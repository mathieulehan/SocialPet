import MySQLdb
import api

global resultsExportUsers
resultsExportUsers = []

global db
db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")


# return all users in BDD
def getUsers():
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    del resultsExportUsers[:]
    sql = "SELECT * FROM socialpet_users"
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0],
                "session": row[1],
                "email": row[2],
                "espece": row[3]
            }
            resultsExportUsers.append(item)
    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()


# store picture past in request
def storeImagePet(img, table, data):
    idUser = retrieveUser(data['email'])
    if (idUser == None):
        item = {
            "error": "utilisateur inexistant"
        }
        return item

    idRace = retrieveRace(data['race'])
    if (idRace == None):
        idRace = insertTable(data['race'], "race", "race")

    idCouleur = retrieveCouleur(data['couleur'])
    if (idCouleur == None):
        idCouleur = insertTable(data['couleur'], "socialpet_couleur", "couleur")

    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO " + table + "(img, idUser, idCouleur, idRace) VALUES (%s, %s, %s, %s)"
    cursor = db.cursor()

    try:
        result = cursor.execute(sql, [img, idUser, idCouleur, idRace])
        db.commit()
        item = {
            "id": cursor.lastrowid,
            "table": table
        }

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    return item


# store multiple picture
def storeMultiImagePet(images, table, data):
    idUser = retrieveUser(data['email'])
    if (idUser == None):
        item = {
            "error": "utilisateur inexistant"
        }
        return item

    idRace = retrieveRace(data['race'])
    if (idRace == None):
        idRace = insertTable(data['race'], "race", "race")

    idCouleur = retrieveCouleur(data['couleur'])
    if (idCouleur == None):
        idCouleur = insertTable(data['couleur'], "socialpet_couleur", "couleur")

    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO " + table + "(img, idUser, idCouleur, idRace) VALUES (%s, %s, %s, %s)"

    records_to_inserts = []
    for img in images:
        records_to_inserts.append([img, idUser, idCouleur, idRace])

    cursor = db.cursor()

    try:
        result = cursor.executemany(sql, records_to_inserts)
        db.commit()
        item = {
            "id": cursor.lastrowid,
            "table": table
        }

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    return item


# return all picture for one table store in the database
def getImage(table):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT * FROM " + table + " as tab INNER JOIN socialpet_users ON tab.idUser = socialpet_users.id "
    cursor = db.cursor()
    resultExport = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            user = {
                "id": row[2],
                "email": row[5]
            }

            item = {
                "id": row[0],
                "img": row[1],
                "table": table,
                "user": user
            }
            resultExport.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return resultExport


# returns all pictures for one table store & one given user in the database
def getImageForUser(table, user_id):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT * FROM " + table + " as tab INNER JOIN race ON tab.idRace = race.id INNER JOIN socialpet_couleur ON tab.idCouleur = socialpet_couleur.id " \
                                     "INNER JOIN socialpet_users ON tab.idUser = socialpet_users.id  WHERE idUser = " \
          + str(user_id)
    cursor = db.cursor()
    images = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            user = {
                "user_id": row[3],
                "email": row[8]
            }
            couleur = {
                "id": row[4],
                "couleur": row[9]
            }
            race = {
                "id": row[5],
                "race": row[7]
            }
            image = {
                "id": row[0],
                "img": row[1],
                "specie": table,
                "user": user,
                "couleur": couleur,
                "race": race,
                "isOwner": row[2]
            }
            images.append(image)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return images


# return all picture of animals store in the database
def getAll():
    CATEGORIES = ['chat', 'poule2', 'chien', 'cheval', 'lapin']
    result = []
    for table in CATEGORIES:
        temp = getImage(table)
        if temp:
            result = result + temp
        temp = []
    return result


# return all picture of animals store in the database
def getAllForUser(user_id):
    CATEGORIES = ['chat', 'poule2', 'chien', 'cheval', 'lapin']
    result = []
    for table in CATEGORIES:
        temp = getImageForUser(table, user_id)
        if temp:
            result = result + temp
        temp = []
    return result


def retrieveUser(email):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT id FROM socialpet_users where email = \"" + email + "\""
    cursor = db.cursor()
    listusers = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0]
            }
            listusers.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    if not listusers:
        return None
    else:
        return listusers[0]['id']


def retrieveCouleur(couleur):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT id FROM socialpet_couleur where couleur = \"" + couleur + "\""
    cursor = db.cursor()
    listcouleur = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0]
            }
            listcouleur.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    if not listcouleur:
        return None
    else:
        return listcouleur[0]['id']


def retrieveRace(race):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT id FROM race where race = \"" + race + "\""
    cursor = db.cursor()
    listrace = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0]
            }
            listrace.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    if not listrace:
        return None
    else:
        return listrace[0]['id']


def insertTable(data, table, colonne):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO " + table + "(" + colonne + ") VALUES (\"" + data + "\")"
    cursor = db.cursor()
    listcouleur = []
    try:
        result = cursor.execute(sql)
        db.commit()

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return cursor.lastrowid


def deleteAnimal(user_id, table):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "DELETE FROM " + table + " WHERE idUser = " + str(user_id)
    cursor = db.cursor()

    try:
        result = cursor.execute(sql)
        db.commit()

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return cursor.rowcount


def deleteAll(user_id):
    CATEGORIES = ['chat', 'poule2', 'chien', 'cheval', 'lapin']
    result = 0
    for table in CATEGORIES:
        result = result + deleteAnimal(user_id, table)

    return result


def retrieveUserById(user_id):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = 'SELECT * FROM socialpet_users where id = %s'
    cursor = db.cursor()
    try:
        cursor.execute(sql, (user_id,))
        result = cursor.fetchone()
        user = {
            "id": result[0],
            "name": result[1],
            "lastname": result[2],
            "email": result[3],
            "password": result[4],
            "created_at": result[5]
        }
    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return user


def createUser(name, lastname, email, password):
    hashedPassword = api.bcrypt.generate_password_hash(password, 13).decode()
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO socialpet_users (name, lastname, email, password) VALUES (%s, %s, %s, %s)"
    cursor = db.cursor()
    try:
        result = cursor.execute(sql, [name, lastname, email, hashedPassword])
        db.commit()
        item = {
            "id": cursor.lastrowid,
            "table": "socialpet_users"
        }

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    return item


def logIn(email, password):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT * FROM socialpet_users where email = \"" + email + "\""
    cursor = db.cursor()
    user = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0],
                "name": row[1],
                "lastname": row[2],
                "email": row[3],
                "password": row[4]
            }
            user.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    if not api.bcrypt.check_password_hash(user[0]['password'], password):
        api.abort(401)
    return user[0]


def deleteUserById(user_id):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "DELETE FROM socialpet_users WHERE id = " + str(user_id)
    cursor = db.cursor()

    try:
        result = cursor.execute(sql)
        db.commit()

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return cursor.rowcount
